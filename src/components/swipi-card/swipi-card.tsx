import { Component, Host, h, Prop, Event, EventEmitter, Element, State } from '@stencil/core';
import 'hammerjs';

@Component({
  tag: 'rg-swipi-card',
  styleUrl: 'swipi-card.scss',
  shadow: true
})
export class SwipiCard {  
  @Element() el: HTMLElement;  
  @Event() swiperight: EventEmitter;
  @Event() swipeleft: EventEmitter;

  @Prop() rightcolor: string;
  @Prop() leftcolor: string;


  eventOverlayElement: HTMLDivElement;
  hammertime: HammerManager;
  
  @State() cardState: {
    offsetX: number, 
    velocityX: number,
    offsetY: number
    velocityY: number,
    rotation: number,
    isMoving: boolean
    isSwiped: boolean
  };



  componentWillLoad() {
    this.cardState = {...this.cardState, offsetX: 0, offsetY:0, isMoving: false}
  }

  componentDidLoad() {
    this.hammertime = new Hammer(this.eventOverlayElement)
    this.hammertime.on('pan', e => {      
      this.cardState = {...this.cardState, 
        offsetX: e.deltaX, 
        velocityX: e.velocityX,
        offsetY: e.deltaY, 
        velocityY: e.velocityY,
        rotation: e.deltaX * 0.03 * e.deltaY / 80,
        isMoving: true,
        isSwiped: false
      }
    })

    this.hammertime.on('panend', ev => {
      let offsetX = 0
      let offsetY = 0
      let rotation = 0
      let isSwiped = false;

      if (ev.velocityX > 1) {
        this.swiperight.emit()
        rotation = 30
        offsetX = document.body.clientWidth
        offsetY -100
        isSwiped = true
      }

      if (ev.velocityX < -1) {
        this.swipeleft.emit()
        rotation = -30
        offsetX = -document.body.clientWidth
        offsetY = -100
        isSwiped = true
      }

      this.cardState = {...this.cardState, 
        offsetX, 
        offsetY, 
        rotation, 
        isSwiped,
        isMoving: false}
    })
  }


  render() {
    return (
      <Host style={{
        pointerEvents: this.cardState.isSwiped ? 'none': 'all',
        borderColor: this.cardState.isMoving ? 'rgba(255,255,255,.6)': 'transparent',
        
        }} >
        <div class='card'
        style={{
        transform: `translate(${this.cardState.offsetX}px, ${this.cardState.offsetY}px) rotate(${this.cardState.rotation}deg)`,
        cursor: this.cardState.isMoving? 'grabbing': 'grab',
        transition: this.cardState.isMoving? 'all 0s linear': 'all 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275), opacity 0.5s ease-out, top 0.5s ease-in-out',
        borderBottomColor: this.cardState.isMoving? this.cardState.offsetX < 0 ? this.leftcolor: this.rightcolor: 'transparent'
        }}>
          <div ref={(el) => this.eventOverlayElement = el as HTMLDivElement} class="event-overlay"></div>
          <slot />
        </div>
      </Host>
    );
  }

}
