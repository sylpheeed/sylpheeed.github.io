"use strict";$(function(){var t,a,c=Date.now(),i=2e5;"undefined"!=typeof Storage&&(a=localStorage.getItem("lstv"),a&&(t=a-Date.now())>5e4?i=Math.abs(t/10)/60:localStorage.setItem("lstv",c+10*i*60));var n=$("#clock").FlipClock({autoStart:!1,clockFace:"DailyCounter",countdown:!0});n.setTime(i),n.start();var e=$("#navigation");e.sticky({topSpacing:0}),$("#n-contact").click(function(){e.find(".active").removeClass("active"),e.find("#n-contact").addClass("active")}),$("#n-contacts").click(function(){e.find(".active").removeClass("active"),e.find("#n-contacts").addClass("active")}),$(".spy").each(function(){var t=$(this).position();$(this).scrollspy({min:t.top,max:t.top+$(this).height(),onEnter:function(t){e.find(".active").removeClass("active"),e.find("#n-"+t.id).addClass("active")}})})});