import { Component, OnInit, ViewChild, TemplateRef, Input, ViewEncapsulation } from '@angular/core';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import { DomSanitizer } from '@angular/platform-browser';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryGreen = '#004631';
const SecondaryBlue = '#006ddd';

@Component({
  selector: 'app-loading-ngx',
  templateUrl: './loading-ngx.component.html',
  styleUrls: ['./loading-ngx.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingNgxComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false }) NgxLoadingComponent!: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate!: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  @Input() loading = false;
  @Input() fullScreenBackdrop = true;
  // public primaryColour = PrimaryWhite;
  // public secondaryColour = SecondaryGrey;
  primaryColour = PrimaryWhite;
  secondaryColour = PrimaryGreen;
  public coloursEnabled = false;
  public loadingTemplate!: TemplateRef<any>;
  // public config = { animationType: ngxLoadingAnimationTypes.circle,
  //                   primaryColour: this.primaryColour,
  //                   secondaryColour: this.secondaryColour,
  //                   tertiaryColour: this.primaryColour,
  //                   backdropBorderRadius: '3px' };
  config = { animationType: ngxLoadingAnimationTypes.circleSwish,
            primaryColour: this.primaryColour, secondaryColour: this.secondaryColour,
            tertiaryColour: this.primaryColour, backdropBorderRadius: '3px',
            fullScreenBackdrop: this.fullScreenBackdrop
            };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    console.log('loading1... = ', this.loading);
  }

  public toggleColours(): void {
    this.coloursEnabled = !this.coloursEnabled;

    if (this.coloursEnabled) {
      this.primaryColour = PrimaryGreen;
      this.secondaryColour = SecondaryBlue;
    } else {
      this.primaryColour = PrimaryWhite;
      this.secondaryColour = SecondaryGrey;
    }
  }

  // toggleTemplate(): void {
  //   if (this.loadingTemplate) {
  //     this.loadingTemplate = null;
  //   } else {
  //     this.loadingTemplate = this.customLoadingTemplate;
  //   }
  // }

  public showAlert(): void {
    alert('ngx-loading rocks!');
  }

}
