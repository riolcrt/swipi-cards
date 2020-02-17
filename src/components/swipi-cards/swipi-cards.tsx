import { Component, h, State, Element } from '@stencil/core';

@Component({
  tag: 'rg-swipi-cards',
  styleUrl: 'swipi-cards.scss',
  shadow: true
})
export class SwipiCards {
  @Element() el:HTMLElement
  @State() currentCard: number
  @State() children: any;

  componentWillLoad() {
    this.currentCard = 0;
    this.children = this.el.querySelectorAll('rg-swipi-card');  
    this.children.forEach(x => { 
      x.addEventListener('swipeleft', () => this.loadNext())
      x.addEventListener('swiperight', () => this.loadNext())
    })
  }


  loadNext() {
    this.currentCard += 1;
    console.log('next card')
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
