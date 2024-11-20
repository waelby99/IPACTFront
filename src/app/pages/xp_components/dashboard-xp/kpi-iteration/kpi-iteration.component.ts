import { Component, OnInit } from '@angular/core';
import { IterationService } from '../../../../core/services/xp_services/iteration.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-kpi-iteration',
  templateUrl: './kpi-iteration.component.html',
  styleUrls: ['./kpi-iteration.component.scss']
})
export class KpiIterationComponent implements OnInit {
  iterations: any[] = [];
  selectedIterationId: string;
  totalIterations: number;
  userStoriesCount: number;
  iterationDuration: string;
  iterationProgress: number;
  iterationOverdue: boolean;
  chartOptions: any = {};
  themeSubscription: any;
  MultixChartOption: any = {};
  chartprocessOptions: any = {};

  constructor(private dataService: IterationService,private theme: NbThemeService
  ) { }

  ngOnInit(): void {
    this.loadIterations();
  }

  loadIterations() {
    this.dataService.getIterations().subscribe(data => {
      this.iterations = data;
      if (this.iterations.length > 0) {
        this.selectedIterationId = this.iterations[0].id;
        this.loadKPIData(this.selectedIterationId);
        this.loadCompletedUserStories();
        this.loadChart();
        this.loadChartProcess();
      }
    });
  }

  onIterationChange(event: any) {
    this.selectedIterationId = event.target.value;
    this.loadKPIData(this.selectedIterationId);
    this.loadCompletedUserStories();
  }

  loadKPIData(iterationId: string) {
    this.dataService.getTotalIterations().subscribe(data => this.totalIterations = data);
    this.dataService.getUserStoriesCount(iterationId).subscribe(data => this.userStoriesCount = data);
    this.dataService.getIterationDuration(iterationId).subscribe(data => this.iterationDuration = data);
    this.dataService.getIterationProgressPercentage(iterationId).subscribe(data => this.iterationProgress = data);
    this.dataService.isIterationOverdue(iterationId).subscribe(data => this.iterationOverdue = data);
  }

  loadCompletedUserStories() {
    this.dataService.getCompletedUserStories().subscribe(data => {
      const xAxisData = Object.keys(data);
      const seriesData = Object.values(data);

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.chartOptions = {
          backgroundColor: echarts.bg,
          color: [colors.primary],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}',
          },
          legend: {
            left: 'left',
            data: ['Completed User Stories'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisData,
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
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: 'Completed User Stories',
              type: 'line',
              data: seriesData,
            },
          ],
        };
      });
    });
  }
  loadChart() {
    this.dataService.getMultipleXAxisChartData().subscribe(data => {
      const startDates = data['startDates'];
      const endDates = data['endDates'];
      const userStoriesCount = data['userStoriesCount'];

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.MultixChartOption = {
          backgroundColor: echarts.bg,
          color: [colors.primary],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['User Stories Count'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          xAxis: [
            {
              type: 'category',
              name: 'Dates',
              data: [...startDates, ...endDates], // Combining start and end dates
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
              boundaryGap: false,
              splitLine: { show: false },
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'Count',
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
            }
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: 'User Stories Count',
              type: 'line',
              data: userStoriesCount,
              markLine: {
                data: [
                  { type: 'average', name: 'Average' },
                ]
              }
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100
            },
            {
              start: 0,
              end: 100,
              handleIcon: 'path://M8 8l8 8-8 8',
              handleSize: '80%',
              height: '15%',
              bottom: '5%'
            }
          ]
        };
      });
    });
  }

  loadChartProcess() {
    this.dataService.getIterationProcessData().subscribe(data => {
      const dates = data['dates'];
      const toDoCounts = data['toDoCounts'];
      const inProgressCounts = data['inProgressCounts'];
      const doneCounts = data['doneCounts'];
      const iterationStartDates = data['iterationStartDates'];
      const iterationEndDates = data['iterationEndDates'];

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.chartprocessOptions = {
          backgroundColor: echarts.bg,
          color: [colors.primary, colors.info, colors.success],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['To Do', 'In Progress', 'Done'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          xAxis: {
            type: 'category',
            data: dates,
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
            splitLine: {
              show: true
            }
          },
          yAxis: {
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
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: 'To Do',
              type: 'line',
              data: toDoCounts,
            },
            {
              name: 'In Progress',
              type: 'line',
              data: inProgressCounts,
            },
            {
              name: 'Done',
              type: 'line',
              data: doneCounts,
            }
          ],
          markLine: {
            data: iterationStartDates.map(date => ({ xAxis: date, name: 'Iteration Start' }))
              .concat(iterationEndDates.map(date => ({ xAxis: date, name: 'Iteration End' }))),
            label: {
              formatter: '{b}',
              color: 'black'
            },
            lineStyle: {
              type: 'dashed',
              color: 'red'
            }
          }
        };
      });
    });
  }
  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

}