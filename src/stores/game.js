import { defineStore } from 'pinia'
import blackjack from '../lib/blackjack'

// import { setToken, removeToken } from '@/utils/auth'
// import { login, getInfo, logout } from '@/api/login'
const { BUST, WIN, LOSE, PUSH, BLACKJACK } = blackjack.results
const BASE_HAND = {
  cards: [],
  result: undefined,
  bets: []
}
const clone = obj => JSON.parse(JSON.stringify(obj))
const DEFAULT_DELAY = 500
const DEALER_DECISION_DELAY = 750

export const game = defineStore({
    id: 'game',
    state: () => ({
        isTitleShowing: true,
        settings: {
            deckCount: 6,
            startingBank: 25,
            shuffleAfterPercent: 0.75,
            minimumBet: 1,
            showBasicStrategy: false
        },
        bank: 0,
        shoe: [],
        hands: [],
        activeHandIndex: null,
        isDealing: false,
        showDrawer: false
    }),
    getters: {
        activeHand (state) {
            return state.hands[state.activeHandIndex]
        },
        dealerTotal (state) {
            if (!state.hands.length) return
            return blackjack.score(state.hands[0].cards)
        },
        isSplit (state) {
            return state.hands.length > 2
        },
        canSplit (state) {
            if (state.bank < state.settings.minimumBet) return false
            if (!state.hands.length || !state.activeHandIndex) return false
            if (state.hands.length > 2) return false
            const cards = state.hands[state.activeHandIndex].cards
            return cards.length === 2 && cards[0].value === cards[1].value
        },
        canDoubleDown (state) {
            if (state.bank < state.settings.minimumBet) return false
            if (!state.hands.length || !state.activeHandIndex) return false
            const cards = state.hands[state.activeHandIndex].cards
            return cards.length === 2
        },
        basicStrategyMove (state) {
            if (!state.hands.length || !state.activeHandIndex || !state.hands[state.activeHandIndex]) return
            const playerCards = state.hands[state.activeHandIndex].cards
            const dealerCards = state.hands[0].cards
            return blackjack.getBasicStrategyMove({ playerCards, dealerCards })
        },
        isGameOver (state) {
            if (!state.hands.length) return false
            const cards = state.hands.map(hand => hand.cards.length).reduce((a, b) => a + b)
            const bets = state.hands[1].bets.length
            return state.bank < state.settings.minimumBet && !bets && !cards && !state.isDealing
        }
    },
    actions: {
        startNewGame () {
            this.hideTitleScreen()
            this.resetShoe({})
            this.resetBank()
            this.resetRound()
        },
        resetRound () {
            this.resetHands()
            this.reshuffleIfNeeded()
            this.bet()
            this.dealRound()
        },
        reshuffleIfNeeded () {
            const shoeUsedPercent = 1 - (this.shoe.length / (this.settings.deckCount * 52))
            if (shoeUsedPercent >= this.settings.shuffleAfterPercent) {
                this.resetShoe({})
            }
        },
        dealRound () {
            if (!this.hands[1].bets[0]) return // must have a bet to deal round
            const dealQueue = [1, 0, 1, 0] // player, dealer, player, dealer
            dealQueue.forEach((handIndex, i) => {
                setTimeout(() => { this.deal({handIndex}) }, DEFAULT_DELAY * (i + 1))
            })
            setTimeout(() => { this.startRound() }, DEFAULT_DELAY * 5)
        },
        startRound () {
            this.checkForBustsAndBlackjacks()
            if (this.hands.find(hand => hand.result)) {
                this.revealDealerHand()
                this.endRound()
            } else {
                this.startNextTurn()
            }
        },
        startNextTurn () {
            this.advanceActiveHand()
            if (this.activeHand.cards.length === 1) { // a newly split hand
                let onlyOnce = this.activeHand.cards[0].value === 'A'
                setTimeout(() => { this.hit({ onlyOnce }) }, DEFAULT_DELAY)
            }
            if (this.activeHandIndex === 0) {
                setTimeout(() => {
                    this.revealDealerHand()
                    setTimeout(() => { this.makeDealerDecision() }, DEALER_DECISION_DELAY)
                }, DEFAULT_DELAY)
            }
        },
        makeDealerDecision () {
            const remainingHands = this.hands.find((hand, i) => !hand.result && i > 0)
            if (this.dealerTotal < 17 && remainingHands) {
                this.hit({ isDealer: true })
            } else {
                this.stand()
            }
          },
        hit ({ onlyOnce = false, isDealer = false, _blackjack = blackjack }) {
            this.setIsDealing({ isDealing: true })
            this.deal({ handIndex: this.activeHandIndex })
            setTimeout(() => {
                this.checkForBustsAndBlackjacks()
                this.setIsDealing({ isDealing: false })
                if (this.activeHand.result || onlyOnce) return this.endTurn()
                if (_blackjack.score(this.activeHand.cards) === 21) return this.endTurn()
                if (isDealer) this.makeDealerDecision()
            }, DEFAULT_DELAY)
          },
        doubleDown () {
            this.setIsDealing({ isDealing: true })
            this.doubleBet()
            setTimeout(() => { this.hit({ onlyOnce: true }) }, DEFAULT_DELAY)
        },
        split () {
            this.split()
            this.resetActiveHand()
            setTimeout(() => {
                this.startNextTurn()
            }, DEFAULT_DELAY * 2)
        },
        stand () {
            this.endTurn()
        },
        endTurn () {
            if (this.activeHandIndex > 0) {
                this.startNextTurn()
            } else {
                this.endRound()
            }
        },
        endRound () {
            this.resetActiveHand()
            this.compareHands({})
            setTimeout(() => { this.settleHands()}, DEFAULT_DELAY * 1.5)
            setTimeout(() => { this.collectWinnings()}, DEFAULT_DELAY * 3.5)
            setTimeout(() => { this.resetRound()}, DEFAULT_DELAY * 4)
        },
        restart () {
            this.startNewGame()
        },
//-------------------
        hideTitleScreen () {
            this.isTitleShowing = false
        },
        toggleDrawer ({ show }) {
            this.showDrawer = show === undefined ? !this.showDrawer : show
        },
        toggleBasicStrategy () {
            this.settings.showBasicStrategy = !this.settings.showBasicStrategy
        },
        resetShoe ({ _blackjack = blackjack }) {
            this.shoe = _blackjack.createShoe(this.settings.deckCount)
            this.shoe = _blackjack.shuffle(this.shoe)
        },
        resetBank () {
            this.bank = this.settings.startingBank
        },
        resetHands () {
            this.hands = [clone(BASE_HAND), clone(BASE_HAND)]
        },
        bet () {
            if (this.bank < this.settings.minimumBet) return
            this.bank -= this.settings.minimumBet
            const bets = [this.settings.minimumBet]
            this.hands[1].bets = bets.slice()
        },
        doubleBet () {
            const bets = this.hands[this.activeHandIndex].bets
            this.bank -= bets[0]
            bets[1] = bets[0]
            this.hands[this.activeHandIndex].bets = bets.slice()
        },
        deal ({ handIndex }) {
            const hand = this.hands[handIndex]
            let newCard = this.shoe.shift()
            const isFirstDealerCard = handIndex === 0 && hand.cards.length === 0
            newCard.isFaceDown = isFirstDealerCard
            hand.cards.push(newCard)
        },
        setIsDealing ({ isDealing }) {
            this.isDealing = isDealing
        },
        split () {
            const hands = this.hands.slice()
            hands[2] = clone(BASE_HAND)
            hands[2].cards.push(hands[1].cards.pop())
            hands[2].bets[0] = hands[1].bets[0]
            this.bank -= hands[2].bets[0]
            this.hands = hands
        },
        checkForBustsAndBlackjacks () {
            const hands = clone(this.hands)
            for (let i = 0; i < hands.length; i++) {
                const hand = hands[i]
                const total = blackjack.score(hand.cards)
                if (total > 21) hand.result = BUST
                if (total === 21 && hand.cards.length === 2) {
                hand.result = BLACKJACK
                }
                if (i > 0 && hands[0].result === BLACKJACK) {
                if (hand.result === BLACKJACK) hand.result = PUSH
                if (!hand.result) hand.result = LOSE
                }
            }
            this.hands = hands
        },
        compareHands ({ _blackjack = blackjack }) {
            const hands = clone(this.hands)
            for (let i = 1; i < hands.length; i++) {
                const hand = hands[i]
                const total = _blackjack.score(hand.cards)
                const dealerTotal = _blackjack.score(hands[0].cards)
                if (dealerTotal === total) hand.result = PUSH
                if (dealerTotal > 21 && !hand.result) hand.result = WIN
                if (total > dealerTotal && !hand.result) hand.result = WIN
                if (dealerTotal > total && !hand.result) hand.result = LOSE
            }
            this.hands = hands
        },
        settleHands () {
            const hands = clone(this.hands)
            for (let i = 1; i < hands.length; i++) {
                const hand = hands[i]
                if (hand.result === BLACKJACK) {
                hand.bets = Array(3).fill(hand.bets[0])
                }
                if (hand.result === WIN) hand.bets.push(...hand.bets)
                if ([LOSE, BUST].includes(hand.result)) hand.bets = []
            }
            this.hands = hands
        },
        collectWinnings () {
            const hands = clone(this.hands)
            for (let i = 1; i < hands.length; i++) {
                const hand = hands[i]
                const winnings = hand.bets.reduce((a, b) => a + b, 0)
                this.bank += winnings
                hand.bets = []
            }
            this.hands = hands
        },
        revealDealerHand () {
            this.hands[0].cards[0].isFaceDown = false
        },
        advanceActiveHand () {
            if (this.activeHandIndex > 0) this.activeHandIndex--
            if (this.activeHandIndex === null) this.activeHandIndex = this.hands.length - 1
        },
        resetActiveHand () {
            this.activeHandIndex = null
        }

    }
})
