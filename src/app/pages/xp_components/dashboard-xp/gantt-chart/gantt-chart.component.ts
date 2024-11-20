import { Component, OnInit } from '@angular/core';
import { IterationService } from '../../../../core/services/xp_services/iteration.service';
import { Iteration } from '../../../../core/models/xp_models/Iteration';

@Component({
  selector: 'ngx-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit {
  chartOptions: any;
  iterations: Iteration[];

  constructor(private iterationService: IterationService) {}

  ngOnInit(): void {
    this.iterationService.getAllIterations().subscribe((data: Iteration[]) => {
      this.iterations = data;
      console.log('Fetched iterations:', this.iterations);
      this.updateChartOptions();
    });
  }

  updateChartOptions(): void {
    const seriesData = [];
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF']; // Add more colors if needed
  
    this.iterations.forEach((iteration, iterationIndex) => {
      const iterationColor = colors[iterationIndex % colors.length];
  
      // Add iteration data
      const iterationData = {
        name: iteration.title,
        value: [
          iterationIndex,
          new Date(iteration.startDate),
          new Date(iteration.endDate)
        ],
        itemStyle: {
          color: iterationColor
        }
      };
      seriesData.push(iterationData);
  
      // Add user stories data
      if (iteration.userStories.length > 0) {
        iteration.userStories.forEach((userStory, userStoryIndex) => {
          const userStoryData = {
            name: `${iteration.title} - ${userStory.title}`,
            value: [
              iterationIndex + (userStoryIndex + 1) / 10, // Slight offset for nested display
              new Date(iteration.startDate),
              new Date(iteration.endDate)
            ],
            itemStyle: {
              color: iterationColor
            }
          };
          seriesData.push(userStoryData);
  
          // Add tasks data
          if (userStory.tasks.length > 0) {
            userStory.tasks.forEach((task, taskIndex) => {
              seriesData.push({
                name: `${iteration.title} - ${userStory.title} - ${task.title}`,
                value: [
                  iterationIndex + (userStoryIndex + 1) / 10 + (taskIndex + 1) / 100, // Further offset for tasks
                  new Date(iteration.startDate),
                  new Date(iteration.endDate)
                ],
                itemStyle: {
                  color: iterationColor
                }
              });
            });
          }
        });
      }
    });
  
    console.log('Series data prepared for chart:', seriesData);
  
    this.chartOptions = {
      tooltip: {
        formatter: params => {
          return `${params.marker}${params.name}: ${params.value[1].toDateString()} - ${params.value[2].toDateString()}`;
        }
      },
      legend: {
        data: this.iterations.map(iteration => iteration.title),
        align: 'left'
      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
          formatter: value => {
            const date = new Date(value);
            return date.toLocaleString('default', { month: 'short', year: 'numeric' });
          },
          rotate: 45, // Rotate the labels to fit better
          fontSize: 12, // Increase the font size
          margin: 10 // Add more space between the labels and axis
        },
        splitLine: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: this.iterations.map(iteration => iteration.title),
        axisLabel: {
          formatter: (value, index) => {
            return `${value}`;
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [
        {
          type: 'custom',
          renderItem: (params, api) => {
            const categoryIndex = api.value(0);
            const start = api.coord([api.value(1), categoryIndex]);
            const end = api.coord([api.value(2), categoryIndex]);
            const height = api.size([0, 1])[1] * 0.6;
            return {
              type: 'rect',
              shape: echarts.graphic.clipRectByRect({
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
              }, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
              }),
              style: api.style()
            };
          },
          encode: {
            x: [1, 2],
            y: 0
          },
          data: seriesData
        }
      ]
    };
  }
}  