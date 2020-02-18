import { Component, h, State, Element, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'rg-swipi-cards',
  styleUrl: 'swipi-cards.scss',
  shadow: true
})
export class SwipiCards {
  @Element() el:HTMLElement
  @Prop() stackOffsetY: number = 0.4;
  @State() currentCard: number
  @State() children: any;
  @Event() stackfinished: EventEmitter<void>;

  componentWillLoad() {
    this.currentCard = 0;
    this.children = this.el.querySelectorAll('rg-swipi-card');  
    this.children.forEach(x => { 
      x.addEventListener('swipeleft', () => this.onChildrenSwipe())
      x.addEventListener('swiperight', () => this.onChildrenSwipe())
    })
  }

  componentDidLoad() {
    console.log(this.stackOffsetY)
  }

  onChildrenSwipe() {
    this.currentCard += 1;
  }

  render() {
    this.children.forEach((x, i) => {
      x.style.top = this.stackOffsetY * (i-this.currentCard) + 'em',
      x.style.position = 'absolute'
      x.style.borderBottom = '2px solid transparent'
      x.style.transitionDelay = 50 * (i-this.currentCard) + 'ms'
      x.style.zIndex = ( this.children.length - i).toString()
      x.style.opacity = (1 - (i - this.currentCard)/6).toString()
      x.style.transition = 'all 0.5s ease-in-out';
    });
    
    return (
      <slot />
    );
  }

}
