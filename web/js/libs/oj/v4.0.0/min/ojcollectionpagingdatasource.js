/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","knockout","ojs/ojdatasource-common","ojs/ojmodel","ojs/ojknockout-model"],function(a,g,c){a.Jc=function(a){this.zb=a;this.current=0;this.Init();this.Qj=[];this.E4(10)};o_("CollectionPagingDataSource",a.Jc,a);a.f.ya(a.Jc,a.sn,"oj.CollectionPagingDataSource");a.Jc.prototype.Init=function(){a.Jc.O.Init.call(this)};a.f.j("CollectionPagingDataSource.prototype.Init",{Init:a.Jc.prototype.Init});a.Jc.prototype.$0=function(){return this.lp()?this.au:this.totalSize()-this.current};
a.Jc.prototype.Lz=function(){this.Qj=Array(this.$0());var a=this;return this.zb.wB(this.current,this.current+this.Qj.length).then(function(c){for(var e=0;e<c.length;e++)a.Qj[e]=c[e];a.NJ();a.Mm=a.Ca+a.Qj.length-1})};a.Jc.prototype.NJ=function(){if(void 0!==this.aq){this.aq.removeAll();for(var b=0;b<this.Qj.length;b++)this.aq.push(a.Gb.map(this.Qj[b]))}};a.Jc.prototype.mu=function(){return this.Qj};a.f.j("CollectionPagingDataSource.prototype.getWindow",{mu:a.Jc.prototype.mu});a.Jc.prototype.oL=function(){void 0===
this.aq&&(this.aq=c.observableArray(),this.NJ());return this.aq};a.f.j("CollectionPagingDataSource.prototype.getWindowObservable",{oL:a.Jc.prototype.oL});a.Jc.prototype.getPage=function(){return this.Xe};a.f.j("CollectionPagingDataSource.prototype.getPage",{getPage:a.Jc.prototype.getPage});a.Jc.prototype.setPage=function(b,c){c=c||{};b=parseInt(b,10);try{a.Jc.O.handleEvent.call(this,a.Kd.fa.BEFOREPAGE,{page:b,previousPage:this.Xe})}catch(e){return Promise.reject(null)}this.pageSize=null!=c.pageSize?
c.pageSize:this.pageSize;c.startIndex=b*this.pageSize;var f=this.Xe;this.Xe=b;this.Ca=c.startIndex;var g=this;return new Promise(function(b,e){g.Zh(c).then(function(){a.Jc.O.handleEvent.call(g,a.Kd.fa.PAGE,{page:g.Xe,previousPage:f});b(null)},function(){g.Xe=f;g.Ca=g.Xe*g.pageSize;e(null)})})};a.f.j("CollectionPagingDataSource.prototype.setPage",{setPage:a.Jc.prototype.setPage});a.Jc.prototype.getStartItemIndex=function(){return this.Ca};a.f.j("CollectionPagingDataSource.prototype.getStartItemIndex",
{getStartItemIndex:a.Jc.prototype.getStartItemIndex});a.Jc.prototype.getEndItemIndex=function(){return this.Mm};a.f.j("CollectionPagingDataSource.prototype.getEndItemIndex",{getEndItemIndex:a.Jc.prototype.getEndItemIndex});a.Jc.prototype.getPageCount=function(){var a=this.totalSize();return-1==a?-1:Math.ceil(a/this.pageSize)};a.f.j("CollectionPagingDataSource.prototype.getPageCount",{getPageCount:a.Jc.prototype.getPageCount});a.Jc.prototype.fetch=function(a){var c=a||{};if(void 0!==c.pageSize&&void 0!==
c.startIndex){if(!this.lp())return this.IR(null),Promise.resolve();this.au=c.startIndex+c.pageSize;var e=this;return this.Lz().then(function(){e.IR(null)})}return this.Zh(a)};a.f.j("CollectionPagingDataSource.prototype.fetch",{fetch:a.Jc.prototype.fetch});a.Jc.prototype.Zh=function(a){var c=a||{};void 0!==c.startIndex&&(this.current=c.startIndex);void 0!==c.pageSize&&(this.au=this.pageSize=c.pageSize);var e=this;return new Promise(function(a){try{e.zb.fetch({success:function(){e.Lz().then(function(){e.IR(c);
a({data:e.mu(),startIndex:e.current})})}})}catch(b){e.Lz().then(function(){e.IR(c);a({data:e.mu(),startIndex:e.current})})}})};a.Jc.prototype.IR=function(a){a=a||{};a.silent||this.handleEvent("sync",{data:this.mu(),startIndex:this.current});a.success&&a.success()};a.Jc.prototype.handleEvent=function(b,c){return a.Jc.O.handleEvent.call(this,b,c)};a.Jc.prototype.lp=function(){return this.current+this.au<this.totalSize()};a.Jc.prototype.E4=function(a){this.au=this.pageSize=a};a.Jc.prototype.size=function(){var a=
this.mu();return a?a.length:0};a.f.j("CollectionPagingDataSource.prototype.size",{size:a.Jc.prototype.size});a.Jc.prototype.totalSize=function(){return this.zb.length};a.f.j("CollectionPagingDataSource.prototype.totalSize",{totalSize:a.Jc.prototype.totalSize});a.Jc.prototype.totalSizeConfidence=function(){return"actual"};a.f.j("CollectionPagingDataSource.prototype.totalSizeConfidence",{totalSizeConfidence:a.Jc.prototype.totalSizeConfidence});a.Jc.prototype.getCapability=function(){return null};a.f.j("CollectionPagingDataSource.prototype.getCapability",
{getCapability:a.Jc.prototype.getCapability})});