import {
  Component,
  HostBinding,
  OnInit,
  ViewChild
} from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
// @ts-ignore
import { SohoBarComponent, SohoCalendarComponent, SohoToastService } from 'ids-enterprise-ng';

export interface Calendar {
  name: string;
  dates?: any;
}
@Component({
  selector: 'app-month',
  templateUrl: 'month.component.html',
})
export class MonthComponent extends ComponentStore<Calendar>   {


  name$ = this.select(state => state.name);
  dates$ = this.select(state => state.dates);

  
  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';

  @ViewChild(SohoCalendarComponent) sohoCalendarComponent?: SohoCalendarComponent;

  
  public showViewChanger = true;
  eventTypes= [  {
    "id": "default",
    "label": "Discretionary Time Off",
    "translationKey": "DiscretionaryTimeOff",
    "color": "amber",
    "checked": true,
    "click": null
  },
  {
    "id": "summerWE",
    "label": "Admin",
    "translationKey": "AdministrativeLeave",
    "color": "green",
    "checked": true,
    "click": null
  },];
 
  public iconTooltip = 'status';
  public eventTooltip = 'comments';
  public eventsLoaded = false;

  public onCalendarDateSelectedCallback = (_node: Node, args: SohoCalendarDateSelectedEvent) => {
    console.log('onCalendarEventSelectedCallback', args);
  }

  constructor( private toastService: SohoToastService) {

    super({ name: 'customer-calendar', dates: []});
 
   }
 

 

  onRenderMonth(event: SohoCalendarRenderMonthEvent) {
    console.log('onRenderMonth', event);
    if (this.eventsLoaded) {
      return;
    }
 
    this.setState((state) => { return { ...state, dates: [
      {
        "id": "1",
        "subject": "Default",
        "shortSubject": "DTO",
        "comments": "Short getaway",
        "location": "Us Office",
        "status": "Draft",
        "starts": "2022-03-01T10:00:00.999",
        "ends": "2022-03-20T11:00:00.999",
        "type": "default",
        "isAllDay": "true"
      },
      {
        "id": "2",
        "subject": "Summer WE",
        "comments": "Quick check-up",
        "location": "Us Office",
        "status": "Draft",
        "starts": "2022-03-21T14:00:00.999",
        "ends": "2022-03-21T18:00:00.999",
        "type": "default",
        "isAllDay": "false"
      }
    ] } })
        this.eventsLoaded = true;
    
  }



  onSelected(event: SohoCalendarDateSelectedEvent) {
    console.log('onSelected', event);
  }

 

  onEventClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Clicked' });
    console.log('onEventClick', event);
  }

  onEventDblClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Double Clicked' });
    console.log('onEventDblClick', event);
  }

  onCalendarEventContextMenu(event: SohoCalendarEventClickEvent) {
    if (event) {
      this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" ContextMenu' });
      console.log('onEventContextMenu', event);
    }
  }
}