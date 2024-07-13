import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HiveService } from '../hive.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Token {
  _id: number;
  account: string;
  symbol: string;
  balance: string;
  stake: string;
  pendingUnstake: string;
  delegationsIn: string;
  delegationsOut: string;
  pendingUndelegations: string;
}

@Component({
  selector: 'app-tokens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit, AfterViewInit {
  username: string = '';
  tokens: any = null;
  error: string = '';
  loading: boolean = false; // Estado de carga
  hiveChart: any;
  engineChart: any;
  selectedTokens: string[] = [];
  showFilterOptions: boolean = false;

  constructor(private hiveService: HiveService) {}

  ngOnInit(): void {
    const savedTokens = localStorage.getItem('selectedTokens');
    if (savedTokens) {
      this.selectedTokens = JSON.parse(savedTokens);
    }
  }

  ngAfterViewInit(): void {
    if (this.tokens) {
      this.createCharts();
    }
  }

  async getTokens() {
    this.loading = true; // Mostrar spinner
    this.error = '';
    this.tokens = null;

    try {
      const tokens = await this.hiveService.getTokens(this.username);
      this.tokens = tokens;
      this.error = '';
      this.createCharts();
    } catch (err) {
      this.error = (err as Error).message;
      this.tokens = null;
    } finally {
      this.loading = false; // Ocultar spinner
    }
  }

  createCharts() {
    if (!this.tokens) {
      console.error('No tokens data available to create charts');
      return;
    }

    setTimeout(() => {
      const ctxHive = document.getElementById('hiveChart') as HTMLCanvasElement;
      const ctxEngine = document.getElementById('engineChart') as HTMLCanvasElement;

      if (!ctxHive || !ctxEngine) {
        console.error('Failed to get context of canvas for charts');
        return;
      }

      if (this.hiveChart) {
        this.hiveChart.destroy();
      }
      if (this.engineChart) {
        this.engineChart.destroy();
      }

      const filteredTokens = this.tokens.otherTokens.filter((token: Token) => this.selectedTokens.includes(token.symbol) || this.selectedTokens.length === 0);

      const hiveTokens = [
        { label: 'HIVE', value: parseFloat(this.tokens?.balance || '0') * this.tokens.hivePrice },
        { label: 'Savings HIVE', value: parseFloat(this.tokens?.savings_balance || '0') * this.tokens.hivePrice },
        { label: 'HBD', value: parseFloat(this.tokens?.hbd_balance || '0') * 1 },
        { label: 'Savings HBD', value: parseFloat(this.tokens?.savings_hbd_balance || '0') * 1 },
        { label: 'HIVE Power', value: parseFloat(this.tokens?.hive_power || '0') * this.tokens.hivePrice }
      ];

      const engineTokens = filteredTokens.map((token: Token) => {
        const tokenValue = parseFloat(token.balance || '0');
        const tokenPrice = this.tokens.tokensData[token.symbol] || 0;
        const value = tokenValue * tokenPrice;
        return {
          label: token.symbol,
          value: value
        };
      });

      this.hiveChart = new Chart(ctxHive, {
        type: 'doughnut',
        data: {
          labels: hiveTokens.map((token: { label: string }) => token.label),
          datasets: [{
            label: 'Hive Tokens',
            data: hiveTokens.map((token: { value: number }) => token.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Distribution of Hive Tokens'
            }
          }
        }
      });

      this.engineChart = new Chart(ctxEngine, {
        type: 'doughnut',
        data: {
          labels: engineTokens.map((token: { label: string }) => token.label),
          datasets: [{
            label: 'Engine Tokens',
            data: engineTokens.map((token: { value: number }) => token.value),
            backgroundColor: engineTokens.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`),
            borderColor: engineTokens.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Distribution of Engine Tokens'
            }
          }
        }
      });
    }, 0);
  }

  toggleTokenSelection(symbol: string) {
    const index = this.selectedTokens.indexOf(symbol);
    if (index > -1) {
      this.selectedTokens.splice(index, 1);
    } else {
      this.selectedTokens.push(symbol);
    }
  }

  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  saveTokenSelection() {
    localStorage.setItem('selectedTokens', JSON.stringify(this.selectedTokens));
    this.createCharts();
  }
}
