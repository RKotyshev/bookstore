import{T as l,i as c}from"./chunk-JJ4NW3S2.js";var o=class{get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}constructor(e=!1,s,t=!0,i){this._multiple=e,this._emitChanges=t,this.compareWith=i,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new c,s&&s.length&&(e?s.forEach(h=>this._markSelected(h)):this._markSelected(s[0]),this._selectedToEmit.length=0)}select(...e){this._verifyValueAssignment(e),e.forEach(t=>this._markSelected(t));let s=this._hasQueuedChanges();return this._emitChangeEvent(),s}deselect(...e){this._verifyValueAssignment(e),e.forEach(t=>this._unmarkSelected(t));let s=this._hasQueuedChanges();return this._emitChangeEvent(),s}setSelection(...e){this._verifyValueAssignment(e);let s=this.selected,t=new Set(e);e.forEach(h=>this._markSelected(h)),s.filter(h=>!t.has(this._getConcreteValue(h,t))).forEach(h=>this._unmarkSelected(h));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}toggle(e){return this.isSelected(e)?this.deselect(e):this.select(e)}clear(e=!0){this._unmarkAll();let s=this._hasQueuedChanges();return e&&this._emitChangeEvent(),s}isSelected(e){return this._selection.has(this._getConcreteValue(e))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(e){this._multiple&&this.selected&&this._selected.sort(e)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(e){e=this._getConcreteValue(e),this.isSelected(e)||(this._multiple||this._unmarkAll(),this.isSelected(e)||this._selection.add(e),this._emitChanges&&this._selectedToEmit.push(e))}_unmarkSelected(e){e=this._getConcreteValue(e),this.isSelected(e)&&(this._selection.delete(e),this._emitChanges&&this._deselectedToEmit.push(e))}_unmarkAll(){this.isEmpty()||this._selection.forEach(e=>this._unmarkSelected(e))}_verifyValueAssignment(e){e.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(e,s){if(this.compareWith){s=s??this._selection;for(let t of s)if(this.compareWith(e,t))return t;return e}else return e}};var E=(()=>{let e=class e{constructor(){this._listeners=[]}notify(t,i){for(let h of this._listeners)h(t,i)}listen(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(i=>t!==i)}}ngOnDestroy(){this._listeners=[]}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();export{o as a,E as b};
