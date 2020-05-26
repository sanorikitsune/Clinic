import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'World';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
  clickHandler(event){
    var urlEvent = event.get("e.force:navigateToURL");
    urlEvent.setParams({
        "url": "/newPage"
    });

    urlEvent.fire();
  }

}