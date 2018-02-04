import stylus from './stylus/index.styl'
import BFn from './js/base'
import {
  setInterval,
  clearInterval
} from 'timers';
const {
  addClass,
  removeClass,
  on
} = BFn

function domLink(option) {
  this.mainDom = option.mainDom.dom
  this.mainDomActiveClass = option.mainDom.activeClass
  this.subDom = option.subDom.dom
  this.subDomActiveClass = option.subDom.activeClass
  this.index = 0
  this.timer
  this.intervalTime = option.intervalTime || 5000
  this.init()
}
domLink.prototype = {
  init: function () {
    let that = this
    if (!this.timer) {
      this.startMove()
    }
    on(solutionTab, 'click', 'li', function (target) {
      that.BClick(target)
      clearInterval(that.timer)
      that.startMove()
    })
  },
  BClick: function (node) {
    let subDomChildren = this.subDom.children
    let children = [].slice.call(node.parentNode.children)
    children.map(e => {
      removeClass(e, this.mainDomActiveClass)
    })
    addClass(node, this.mainDomActiveClass)
    this.index = children.indexOf(node)
    for (let i = 0; i < subDomChildren.length; i++) {
      if (i != this.index) {
        removeClass(subDomChildren[i], this.subDomActiveClass)
      } else {
        addClass(subDomChildren[i], this.subDomActiveClass)
      }
    }
  },
  startMove: function () {
    let mainDomChildren = this.mainDom.children
    this.timer = setInterval(function () {
      let tabLength = mainDomChildren.length
      this.index = (this.index + 1) % tabLength
      this.BClick(mainDomChildren[this.index])
    }.bind(this), this.intervalTime)
  }
}


var solutionTab = document.getElementById('solution-tab')
var tabContent = document.getElementById('tab-content')
new domLink({
  mainDom: {
    dom: solutionTab,
    activeClass: 'tab-item-active'
  },
  subDom: {
    dom: tabContent,
    activeClass: 'solution-item-active'
  }
})

var bannerTab = document.getElementById('banner-tab')
var bannerContent = document.getElementById('banner-content')
new domLink({
  mainDom:{
    dom:bannerTab,
    activeClass:'tab-item-active'
  },
  subDom:{
    dom:bannerContent,
    activeClass:'banner-item-active'
  }
})
// function BClick(node) {
//   var children = [].slice.call(node.parentNode.children)
//   children.map(e => {
//     removeClass(e, 'tab-item-active')
//   })
//   addClass(node, 'tab-item-active')
//   index = children.indexOf(node)
//   for (let i = 0; i < solutionItems.length; i++) {
//     if (i != index) {
//       removeClass(solutionItems[i], 'solution-item-active')
//     } else {
//       addClass(solutionItems[i], 'solution-item-active')
//     }
//   }
// }

// function init(){
//   if(!timer){
//     startMove()
//   }
//   on(solutionTab, 'click', 'li', function (target) {
//   BClick(target)
//   clearInterval(timer)
//   startMove()
// })
// }


// function startMove() {
//    timer = setInterval(function () {
//     var tabLength = solutionTab.children.length
//     index = (index + 1) % tabLength
//     BClick(solutionTab.children[index])
//   }, 2000)
// }
// init()
