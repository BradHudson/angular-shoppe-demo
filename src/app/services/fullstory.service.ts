import {
    Injectable
} from '@angular/core';
import * as FullStory from '@fullstory/browser';

@Injectable({
    providedIn: 'root'
})

export class FullStoryService {
    constructor() {}

    customEvent(event: any): void {
        FullStory.event(event.type, event["detail"]);
    }

    rageClick(details: any): void {
        this.customEvent({
            type: 'rage_click',
            detail: {
                details
            }
        });
    }

    userVars(vars: any): void {
        FullStory.setUserVars(vars);
    }
}