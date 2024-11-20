import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../../core/services/xp_services/task.service';
import { NbThemeService } from '@nebular/theme';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'ngx-kpi-task',
  templateUrl: './kpi-task.component.html',
  styleUrls: ['./kpi-task.component.scss']
})
export class KpiTaskComponent implements OnInit, OnDestroy {
  statusChartOptions: EChartsOption;
  taskCountChartOptions: EChartsOption;
  bugsInIncompleteTasksChartOptions: EChartsOption;
  bugsCount: number;
  totalTasks: number;
  tasks: any[] = [];
  selectedTaskId: string;
  statuses: string[] = ['TO_DO', 'IN_PROGRESS', 'DONE'];
  totalTasksByStatus: { [key: string]: number } = {};
  bugsInIncompleteTasks: { [key: string]: number } = {};
  themeSubscription: any;

  constructor(private taskService: TaskService, private theme: NbThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.loadTasks();
      this.loadTaskStatusDistribution(colors, echarts);
      this.loadTaskCountByStatus(colors, echarts);
      this.loadBugsInIncompleteTasks(colors, echarts); // Updated method call
      this.loadTotalTasks();
    });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      if (this.tasks.length > 0) {
        this.selectedTaskId = this.tasks[0].id;
        this.loadBugsCount();
      }
    });
  }

  loadTaskStatusDistribution(colors, echarts) {
    this.taskService.getTaskStatusDistribution().subscribe(data => {
      const chartData = Object.entries(data).map(([key, value]) => ({ name: key, value }));
      this.statusChartOptions = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        title: {
          left: 'center',
          textStyle: {
            color: echarts.textColor,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Status',
            type: 'pie',
            radius: '50%',
            data: chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  loadTaskCountByStatus(colors, echarts) {
    this.totalTasksByStatus = {};
    this.statuses.forEach(status => {
      this.taskService.getTaskCountByStatus(status).subscribe(count => {
        this.totalTasksByStatus[status] = count;
        this.updateTaskCountChart(colors, echarts);
      });
    });
  }

  updateTaskCountChart(colors, echarts) {
    const chartData = Object.entries(this.totalTasksByStatus).map(([status, count]) => ({ name: status, value: count }));
    this.taskCountChartOptions = {
      backgroundColor: echarts.bg,
      color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
      title: {
        left: 'center',
        textStyle: {
          color: echarts.textColor,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: echarts.textColor,
        },
      },
      series: [
        {
          name: 'Count',
          type: 'pie',
          radius: '50%',
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: echarts.itemHoverShadowColor,
            },
          },
          label: {
            normal: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
          },
        },
      ],
    };
  }

  loadBugsCount() {
    if (this.selectedTaskId) {
      this.taskService.getBugsCount(this.selectedTaskId).subscribe(count => {
        this.bugsCount = count;
      });
    }
  }

  loadBugsInIncompleteTasks(colors, echarts) {
    this.taskService.getBugsInIncompleteTasks().subscribe(data => {
      const categories = Object.keys(data);
      const values = Object.values(data);
      
      this.bugsInIncompleteTasksChartOptions = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: categories,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Bugs',
            type: 'bar',
            barWidth: '60%',
            data: values,
          },
        ],
      };
    });
  }

  loadTotalTasks() {
    this.taskService.getCountTotaltasks().subscribe(count => {
      this.totalTasks = count;
    });
  }

  onTaskChange(event: any) {
    this.selectedTaskId = event.target.value;
    this.loadBugsCount();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
