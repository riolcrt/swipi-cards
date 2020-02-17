import { Component, h, State, Element, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'rg-swipi-cards',
  styleUrl: 'swipi-cards.scss',
  shadow: true
})
export class SwipiCards {
  @Element() el:HTMLElement
  @State() currentCard: number
  @State() children: any;

  @Event() swipeLeft: EventEmitter<any>;
  @Event() swipeRight: EventEmitter<any>;

  componentWillLoad() {
    this.currentCard = 0;
    this.children = this.el.querySelectorAll('rg-swipi-card');  
    this.children.forEach(x => { 
      x.addEventListener('swipeleft', (x) => this.onChildrenSwipeLeft(x.target))
      x.addEventListener('swiperight', (x) => this.onChildrenSwipeRight(x.target))
    })
  }

  onChildrenSwipeLeft(card) {
    console.log(card)
    this.swipeLeft.emit(card)
    this.currentCard += 1;
  }

  onChildrenSwipeRight(card) {
    this.swipeRight.emit(card)
    this.currentCard += 1;
  }

  render() {
    this.children.forEach((x, i) => {
      x.style.top = .4 * (i-this.currentCard) + 'em',
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
