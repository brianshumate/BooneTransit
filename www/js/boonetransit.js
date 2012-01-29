/**
* boonetransit.js
* PhoneGap and jQuery Mobile management code
* for BooneTransit app.
* Copyright 2011 Brian Shumate
*/

//  NativeControls setup
var nativeControls,
    tabBarItems = { tabs: [
                            {
                              "link": "about.html",
                              "name": "About",
                              "img": "www/img/tabbar-about.png"
                            },
                            {
                              "link": "routes.html",
                              "name": "Routes",
                              "img": "www/img/tabbar-routes.png"
                             },
                             {
                               "link": "maps.html",
                               "name": "Maps",
                               "img": "www/img/tabbar-map.png"
                             },
                             {
                               "link": "schedules.html",
                               "name": "Schedules",
                               "img": "www/img/tabbar-schedules.png"
                             },
                         ]};

// Check communications
function checkComm() {
  var networkState = navigator.network.connection.type;
    
  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.NONE]     = 'No network connection';
  
  if (states[networkState] === 'Unknown connection' ||
      states[networkState] === undefined) {
    navigator.notification.alert('No network connection detected.');
  }
  else {
    // holla('Connection type: ' + states[networkState]);
    console.log('Connection type: ' + states[networkState]);
  }
}

// TabBar functions
function setupTabBar() {
  nativeControls.createTabBar();
  var i = 0;
  for (i = 0; i < tabBarItems.tabs.length; i++) {
    makeButton(tabBarItems.tabs[i]);
  }
  nativeControls.showTabBarItems('About','Routes','Maps','Schedules');
}

function makeButton(tab) {
  var options = new Object();
  options.onSelect = function() {
    // alert(tab.name);
    $.mobile.changePage(tab.link, { transition: "slideup"});
  };   
  nativeControls.createTabBarItem(tab.name, tab.name, tab.img, options);
}

function buildTabBar() {
  var options = new Object();
  options.position = 'bottom';
  nativeControls.showTabBar(options);
}

// Child Browser functions
function setupChildBrowser() {
  var cb = ChildBrowser.install(); 

  if(cb != null) { 
    cb.onLocationChange = function(loc) {
        root.locChanged(loc);
    }
    cb.onClose = function() {
        root.onCloseBrowser();
    }
    cb.onOpenExternal = function(){
        root.onOpenExternal();
    }
  }

  function openChildBrowser(url) {
    try { 
      window.plugins.childBrowser.showWebPage(url); 
    } 
    catch (err) 
    { 
      navigator.notification.alert(err);
    } 
  }
}

// Generic alert wrapper
function holla(msg) {
  navigator.notification.alert(msg);
}

// "Indiana Jones and The onBodyLoad() of Doom"
function onBodyLoad() {
    $('#actweets').live('pageinit', function() {
      $('#actweets').live('pageshow', function(e) {
        console.log('Tweets Anywhere loaded (@appalcart)');
        $('#tweetsadm').jTweetsAnywhere({
          username: 'appalcart',
          count: 10,
          showFollowButton: true,
          showProfileImages: true,
          showTwitterBird: false,
          showGeoLocation: false,
          showInReplyTo: false
        });
        return true;
      });
    });
    $("a.link").live("click", function(event) {
      var url = $(this).attr('href');
      if (url.indexOf("http://")>=0) {
        window.plugins.childBrowser.showWebPage(url, true);
        return false;
      }
    });
    $("a.slink").live("click", function(event) {
      var url = $(this).attr('href');
      if (url.indexOf("https://") >= 0) {
        window.plugins.childBrowser.showWebPage(url, true);
        return false;
      }
    });
    $("a.email").live("click", function(event) {
      console.log('Caught an email click');
      var recpt = $(this).attr('rel');
      window.plugins.emailComposer.showEmailComposer('Admissions question (from the mobile app)', ' ', recpt, '', '', 'False');
      return true;
    });
	

  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  setupChildBrowser();
  nativeControls = window.plugins.nativeControls;
  setupTabBar();
  buildTabBar();
  checkComm();
}

// If you want to prevent dragging, uncomment this section
/*
 function preventBehavior(e) { 
 e.preventDefault(); 
 };
 
 document.addEventListener("touchmove", preventBehavior, false);
 */

// URL opening *mumble*
/*
 function handleOpenURL(url) {
 // TODO: do something with the url passed in.
 }
 */
