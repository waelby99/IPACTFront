import { Component, OnInit } from '@angular/core';
import { UserStoryService } from '../../../../core/services/xp_services/user-story.service'; // Update with your correct path
import { UserStoryStatus } from '../../../../core/models/xp_models/UserStoryStatus.enum'; // Update with your correct path
import { UserStoryPriority } from '../../../../core/models/xp_models/UserStoryPriority.enum'; // Update with your correct path

@Component({
  selector: 'ngx-kpi-user-stories',
  templateUrl: './kpi-user-stories.component.html',
  styleUrls: ['./kpi-user-stories.component.scss']
})
export class KpiUserStoriesComponent implements OnInit {
  statuses = Object.values(UserStoryStatus);
  priorities = Object.values(UserStoryPriority);
  selectedStatus: UserStoryStatus = UserStoryStatus.TO_DO;
  selectedPriority: UserStoryPriority = UserStoryPriority.HIGH;
  statusDistribution: any[] = [];
  priorityDistribution: any[] = [];
  averageTasks: number | undefined;
  totalUserStories: number | undefined;

  // Chart options for ECharts
  statusChartOptions: any;
  priorityChartOptions: any;
  averageTasksChartOptions: any;

  constructor(private userStoryService: UserStoryService) { }

  ngOnInit(): void {
    this.loadKPIData();
  }

  loadKPIData() {
    this.userStoryService.getCountTotalUserStories().subscribe(data => {
      this.totalUserStories = data;
    });

    this.updateStatusDistribution();
    this.updatePriorityDistribution();
    this.updateAverageTasks();
  }

  updateStatusDistribution() {
    this.userStoryService.getUserStoryStatusDistribution().subscribe(data => {
      this.statusDistribution = Object.entries(data).map(([key, value]) => ({ name: key, value }));
      this.initializeStatusChart();
    });
  }

  updatePriorityDistribution() {
    this.userStoryService.getUserStoryPriorityDistribution().subscribe(data => {
      this.priorityDistribution = Object.entries(data).map(([key, value]) => ({ name: key, value }));
      this.initializePriorityChart();
    });
  }

  updateAverageTasks() {
    this.userStoryService.getAverageTasksPerUserStory().subscribe(data => {
      this.averageTasks = data;
      this.initializeAverageTasksGauge();
    });
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.target.value;
    this.updateStatusDistribution();
  }

  onPriorityChange(event: any) {
    this.selectedPriority = event.target.value;
    this.updatePriorityDistribution();
  }

  initializeStatusChart() {
    this.statusChartOptions = {
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Status',
          type: 'pie',
          radius: '50%',
          data: this.statusDistribution,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  initializePriorityChart() {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];
  
    // Sample data generation (you can replace this with your actual data logic)
    for (let i = 0; i < this.priorityDistribution.length; i++) {
      xAxisData.push(this.priorityDistribution[i].name); // Categories
      data1.push(this.priorityDistribution[i].value); // Priority distribution data
      // If you have a second dataset to compare, you can add it here
      data2.push(Math.random() * 100); // Example for demonstration, replace with real data if needed
    }
  
    this.priorityChartOptions = {
      backgroundColor: 'white', // Customize as needed
      color: ['#00aaff', '#ffcc00'], // Customize with your desired colors
      legend: {
        data: ['Priority', 'Comparison'],
        align: 'left',
        textStyle: {
          color: '#000000', // Customize legend text color
        },
      },
      xAxis: [
        {
          data: xAxisData,
          silent: false,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#000000', // Customize axis line color
            },
          },
          axisLabel: {
            textStyle: {
              color: '#000000', // Customize axis label color
            },
          },
        },
      ],
      yAxis: [
        {
          axisLine: {
            lineStyle: {
              color: '#000000', // Customize axis line color
            },
          },
          splitLine: {
            lineStyle: {
              color: '#eeeeee', // Customize split line color
            },
          },
          axisLabel: {
            textStyle: {
              color: '#000000', // Customize axis label color
            },
          },
        },
      ],
      series: [
        {
          name: 'Priority',
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'Comparison',
          type: 'bar',
          data: data2, // Only include if you have a second dataset
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }
  

  initializeAverageTasksGauge() {
    this.averageTasksChartOptions = {
      title: {
        text: 'Average Tasks Overview',
        left: 'center'
      },
      tooltip: {
        formatter: '{a} <br/>{b}: {c}'
      },
      series: [
        {
          name: 'Tasks',
          type: 'gauge',
          radius: '80%',
          min: 0,
          max: 100, // Adjust max value according to your context
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [[0.2, '#67e0e3'], [0.8, '#37a2da'], [1, '#fd666d']],
              width: 8
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto'
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto'
            }
          },
          pointer: {
            width: 5
          },
          title: {
            offsetCenter: [0, '-20%'],
            textStyle: {
              color: '#333',
              fontSize: 20
            }
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}',
            fontSize: 30
          },
          data: [{ value: this.averageTasks, name: 'Average Tasks' }]
        }
      ]
    };
  }
  
  
}
