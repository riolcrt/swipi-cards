import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { SwipiCard } from '../swipi-card/swipi-card';

@Component({
  tag: 'rg-swipi-cards',
  styleUrl: 'swipi-cards.scss',
  shadow: true
})
export class SwipiCards {

  @Prop() cardStack: SwipiCard[]

  @State() currentCard: number

  componentWillLoad() {
    this.currentCard = 0;
    console.log(this.cardStack);
  }

  loadNext() {
    this.currentCard += 1;
  }


  render() {
    return (
      <Host>
        {this.cardStack.map((x, i) => {
          const cardstackstyle = {
              top: .4 * (i-this.currentCard) + 'em',
              transitionDelay: 50 * (i-this.currentCard) + 'ms',
              zIndex:( this.cardStack.length - i).toString(),
              opacity: (1 - (i - this.currentCard)/6).toString()
            
          } 
          return (
            <rg-swipi-card 
              onSwipeleft={() => this.loadNext()}
              onSwiperight={() => this.loadNext()}
              leftColor="#BB377D"
              rightColor="#C9FFBF"
              style={cardstackstyle}
              >
              <h1>I'm a card</h1>
              <img style={{borderRadius: '20px'}} src={`https://api.adorable.io/avatars/200/Della-Edwards${i}.png`}></img>
              <h2>And i iike it!</h2>
            </rg-swipi-card>
          )}
          )}
      </Host>
    );
  }

}
