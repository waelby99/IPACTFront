import { Component, OnInit } from '@angular/core';
import { BugService } from '../../../../core/services/xp_services/bug.service';
import { EChartsOption } from 'echarts';
import { BugStatus } from '../../../../core/models/xp_models/bug-status.enum'; // Adjust the path if needed

@Component({
  selector: 'ngx-kpi-bugs',
  templateUrl: './kpi-bugs.component.html',
  styleUrls: ['./kpi-bugs.component.scss']
})
export class KpiBugsComponent implements OnInit {
  bugsCountByStatus: { [key: string]: number } = {};
  averageBugProgress: number;
  bugsStatusDistribution: { [key: string]: number } = {};
  bugsCountPerTask: { [key: string]: number } = {};
  totalBugs: number;
  statusChartOptions: EChartsOption;
  progressChartOptions: EChartsOption;
  bugsPerTaskChartOptions: EChartsOption;

  constructor(private bugService: BugService) {}

  ngOnInit(): void {
    this.loadBugsCountByStatus();
    this.loadAverageBugProgress();
    this.loadBugsStatusDistribution();
    this.loadBugsCountPerTask();
    this.loadTotalBugs();
  }

  loadBugsCountByStatus() {
    const statuses = Object.values(BugStatus);
    statuses.forEach(status => {
      this.bugService.countBugsByStatus(status).subscribe(count => {
        this.bugsCountByStatus[status] = count;
        this.updateStatusChart();
      });
    });
  }

  loadAverageBugProgress() {
    this.bugService.getAverageBugProgress().subscribe(progress => {
      this.averageBugProgress = progress;
      this.updateProgressChart();
    });
  }

  loadBugsStatusDistribution() {
    this.bugService.getBugsStatusDistribution().subscribe(data => {
      this.bugsStatusDistribution = data;
      this.updateStatusChart();
    });
  }

  loadBugsCountPerTask() {
    this.bugService.getBugsCountPerTask().subscribe(data => {
      this.bugsCountPerTask = data;
      this.updateBugsPerTaskChart();
    });
  }

  loadTotalBugs() {
    this.bugService.getCountTotalBugs().subscribe(count => {
      this.totalBugs = count;
    });
  }

  updateStatusChart() {
    const chartData = Object.entries(this.bugsCountByStatus).map(([status, count]) => ({
      name: status,
      value: count,
    }));
  
    this.statusChartOptions = {
      title: {
        left: 'center',
        text: 'Bugs Count by Status',
      },
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
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.name),
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Bugs',
          type: 'bar',
          data: chartData.map(item => item.value),
          itemStyle: {
            color: '#ff6f61', // Custom color for the bars
          },
          barWidth: '50%',
        },
      ],
    };
  }
  

  updateProgressChart() {
    this.progressChartOptions = {
      title: {
        text: 'Progress Overview',
        left: 'center'
      },
      tooltip: {
        formatter: '{a} <br/>{b}: {c}%',
      },
      series: [
        {
          name: 'Progress',
          type: 'gauge',
          radius: '80%',
          min: 0,
          max: 100, // Adjust if needed
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [[0.2, '#67e0e3'], [0.8, '#3b8dd0'], [1, '#fd666d']],
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
              color: '#3b8dd0',
              fontSize: 20
            }
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            fontSize: 30
          },
          data: [{ value: this.averageBugProgress, name: 'Progress' }]
        }
      ]
    };
  }
  

  updateBugsPerTaskChart() {
    const chartData = Object.entries(this.bugsCountPerTask).map(([task, count]) => ({
      name: task,
      value: count,
    }));
  
    this.bugsPerTaskChartOptions = {
      title: {
        left: 'center',
        text: 'Bugs per Task',
      },
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
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.name),
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Bugs',
          type: 'bar',
          data: chartData.map(item => item.value),
          itemStyle: {
            color: '#3b8dd0',
          },
          barWidth: '50%',
        },
      ],
    };
  }
}
