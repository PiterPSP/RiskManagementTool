import { Component, OnInit } from '@angular/core';
import { Risk } from 'src/app/model/risk';
import { Router, ActivatedRoute } from '@angular/router';
import { RisksService } from 'src/app/services/risks.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-risk-edit',
  templateUrl: './risk-edit.component.html',
  styleUrls: ['./risk-edit.component.css']
})
export class RiskEditComponent implements OnInit {

  public impacts: string[];
  public probabilities: string[];
  public severities: string[];

  constructor(
    private risksService: RisksService,
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService
  ) { }

  public risk: Risk;

  ngOnInit(): void {
    this.risk = new Risk();
    this.getEnums();
    this.getRiskId();
    this.getRisk();
  }

  getEnums() {
    this.impacts = this.storeService.impacts;
    this.probabilities = this.storeService.probability;
    this.severities = this.storeService.severity;
  }

  getRiskId() {
    this.route.paramMap.subscribe(params => {
      this.risk.id = +params.get('id');
    });
  }

  getRisk() {
    this.risksService.getRiskDetails(this.risk.id).then(
      result => {
        this.risk = result;
      }
    );
  }

  public save(): void {
    this.risksService.updateRisk(this.risk).subscribe(res => {
      if (res)
        this.router.navigate(['/registers/details/' + this.risk.registerId]);
    });
  }
}
