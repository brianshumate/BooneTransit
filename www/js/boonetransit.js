/**
* boonetransit.js
* PhoneGap and jQuery Mobile management code
* for BooneTransit app.
* Copyright 2011 Brian Shumate
*/

function onBodyLoad()
 {

    $("a.link").live(
    "click",
    function(event) {
        var url = $(this).attr('href');
        if (url.indexOf("http://") >= 0) {
            window.plugins.childBrowser.showWebPage(url, true);
            return false;
        }
    });

    $("a.slink").live(
    "click",
    function(event) {
        var url = $(this).attr('href');
        if (url.indexOf("https://") >= 0) {
            window.plugins.childBrowser.showWebPage(url, true);
            return false;
        }
    });

    $("a.emaillink").live(
    "click",
    function(event) {
        var recpt = $(this).attr('rel');
        window.plugins.emailComposer.showEmailComposer('Question from BooneTransit mobile app', ' ', recpt, '', '', 'False');
    });

    $("a.fbemail").live(
    "click",
    function(event) {
        var recpt = $(this).attr('rel');
        window.plugins.emailComposer.showEmailComposer('Feedback for BooneTransit (iOS)', ' ', recpt, '', '', 'False');
    });

    $("a.foemail").live(
    "click",
    function(event) {
        var recpt = $(this).attr('rel');
        window.plugins.emailComposer.showEmailComposer('Question from BooneTransit mobile app', ' ', recpt, '', '', 'False');
    });

    $("a.acemail").live(
    "click",
    function(event) {
        var recpt = $(this).attr('rel');
        window.plugins.emailComposer.showEmailComposer('Question from BooneTransit mobile app', ' ', recpt, '', '', 'False');
    });

    $('div.panel').live('pagecreate',
    function(event) {

        navigator.network.isReachable('createoplex.com',
        function(reachability) {
            // There is no consistency on the format of reachability
            var networkState = reachability.code || reachability;

            var states = {};
            states[NetworkStatus.NOT_REACHABLE] = 'No network connection';
            states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
            states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK] = 'WiFi connection';

            var currentstatus = states[networkState];

            function alertDismissed() {
                console.log('Net alert dismissed');
                return true;
            }

            if (currentstatus === undefined || currentstatus === '') {
                navigator.notification.alert(
                'This feature requires a network connection.',
                alertDismissed,
                'Requires Network',
                // title
                'OK'
                // buttonName
                );
            }

        });


    });

    document.addEventListener("deviceready", onDeviceReady, false);

}


function onDeviceReady()
 {
    // Announce our presence
    //navigator.notification.alert("Hello World!");
// NATIVE CONTROLS //////////////////////////////////////////////////////////

// JS ::::::::
 
/*
 //  This code is adapted from the work of:
 //  Created by Michael Nachbaur on 13/04/09.
 //  Copyright 2009 Decaf Ninja Software. All rights reserved.
 //  MIT licensed
 */
 
/**
 * This class exposes mobile phone interface controls to JavaScript, such as
 * native tab and tool bars, etc.
 * @constructor
 */
function NativeControls() {
    this.tabBarTag = 0;
    this.toolBarIndexes = 0;
   
    this.tabBarCallbacks = {};
    this.toolBarCallbacks = {};
   
    this.tappedToolBarItem = null;
    this.selectedTabBarItem = null;
}
 
/**
 * Create a native tab bar that can have tab buttons added to it which can respond to events.
 */
NativeControls.prototype.createTabBar = function() {
    PhoneGap.exec("NativeControls.createTabBar");
};
 
/**
 * Show a tab bar.  The tab bar has to be created first.
 * @param {Object} [options] Options indicating how the tab bar should be shown:
 * - \c height integer indicating the height of the tab bar (default: \c 49)
 * - \c position specifies whether the tab bar will be placed at the \c top or \c bottom of the screen (default: \c bottom)
 */
NativeControls.prototype.showTabBar = function(options) {
    if (!options) options = {'position' : 'bottom'};
    PhoneGap.exec("NativeControls.showTabBar", options);
};
 
/**
 * Hide a tab bar.  The tab bar has to be created first.
 */
NativeControls.prototype.hideTabBar = function(animate) {
    if (animate == undefined || animate == null)
        animate = true;
    PhoneGap.exec("NativeControls.hideTabBar", { animate: animate });
};
 
/**
 * Create a new tab bar item for use on a previously created tab bar.  Use ::showTabBarItems to show the new item on the tab bar.
 *
 * If the supplied image name is one of the labels listed below, then this method will construct a tab button
 * using the standard system buttons.  Note that if you use one of the system images, that the \c title you supply will be ignored.
 *
 * <b>Tab Buttons</b>
 *   - tabButton:More
 *   - tabButton:Favorites
 *   - tabButton:Featured
 *   - tabButton:TopRated
 *   - tabButton:Recents
 *   - tabButton:Contacts
 *   - tabButton:History
 *   - tabButton:Bookmarks
 *   - tabButton:Search
 *   - tabButton:Downloads
 *   - tabButton:MostRecent
 *   - tabButton:MostViewed
 * @param {String} name internal name to refer to this tab by
 * @param {String} [title] title text to show on the tab, or null if no text should be shown
 * @param {String} [image] image filename or internal identifier to show, or null if now image should be shown
 * @param {Object} [options] Options for customizing the individual tab item
 *  - \c badge value to display in the optional circular badge on the item; if null or unspecified, the badge will be hidden
 */
NativeControls.prototype.createTabBarItem = function(name, label, image, options) {
   
        var tag = this.tabBarTag++;
    if (options && 'onSelect' in options && typeof(options['onSelect']) == 'function') {
        this.tabBarCallbacks[tag] = {'onSelect':options.onSelect,'name':name};
        //delete options.onSelect;
    }
       
    PhoneGap.exec("NativeControls.createTabBarItem", name, label, image, tag, options);
};
 
/**
 * Update an existing tab bar item to change its badge value.
 * @param {String} name internal name used to represent this item when it was created
 * @param {Object} options Options for customizing the individual tab item
 *  - \c badge value to display in the optional circular badge on the item; if null or unspecified, the badge will be hidden
 */
NativeControls.prototype.updateTabBarItem = function(name, options) {
    if (!options) options = {};
    PhoneGap.exec("NativeControls.updateTabBarItem", name, options);
};
 
/**
 * Show previously created items on the tab bar
 * @param {String} arguments... the item names to be shown
 * @param {Object} [options] dictionary of options, notable options including:
 *  - \c animate indicates that the items should animate onto the tab bar
 * @see createTabBarItem
 * @see createTabBar
 */
NativeControls.prototype.showTabBarItems = function() {
    var parameters = [ "NativeControls.showTabBarItems" ];
    for (var i = 0; i < arguments.length; i++) {
        parameters.push(arguments[i]);
    }
    PhoneGap.exec.apply(this, parameters);
};
 
 
/**
 * Function to detect currently selected tab bar item
 * @see createTabBarItem
 * @see showTabBarItems
 */
NativeControls.prototype.getSelectedTabBarItem = function() {
    return this.selectedTabBarItem;
};
 
 
/**
 * Manually select an individual tab bar item, or nil for deselecting a currently selected tab bar item.
 * @param {String} tabName the name of the tab to select, or null if all tabs should be deselected
 * @see createTabBarItem
 * @see showTabBarItems
 */
NativeControls.prototype.selectTabBarItem = function(tab) {
    PhoneGap.exec("NativeControls.selectTabBarItem", tab);
};
 
/**
 * Function called when a tab bar item has been selected.
 * @param {Number} tag the tag number for the item that has been selected
 */
NativeControls.prototype.tabBarItemSelected = function(tag)
{
        this.selectedTabBarItem = tag;
    if (typeof(this.tabBarCallbacks[tag].onSelect) == 'function')
        this.tabBarCallbacks[tag].onSelect(this.tabBarCallbacks[tag].name);
};
 
 
 
 
/**
 * Create a toolbar.
 */
NativeControls.prototype.createToolBar = function()
{
    PhoneGap.exec("NativeControls.createToolBar");
};
/**
 * Function called when a tab bar item has been selected.
 * @param {String} title the title to set within the toolbar
 */
NativeControls.prototype.setToolBarTitle = function(title)
{
    PhoneGap.exec("NativeControls.setToolBarTitle", title);
};
/*
 * Added by Emile khattar: emile818@gmail.com emile@sign.al
 * @ 2011-07-08 ,  5.00 AM
 */
/**
 * Set toolBarItems = nil;
 */
NativeControls.prototype.resetToolBar = function() {
    PhoneGap.exec("NativeControls.resetToolBar");
};
/**
 * Hide the tool bar
 * @brief hide the tool bar
 */
NativeControls.prototype.hideToolBar = function() {
    PhoneGap.exec("NativeControls.hideToolBar");
};
 
/**
 * Show the tool bar ( re-render elements )
 * @brief Show the tool bar
 */
NativeControls.prototype.showToolBar = function() {
    PhoneGap.exec("NativeControls.showToolBar");
};
 
/**
 * Set the toolbar title
 * @param: title
 */
NativeControls.prototype.setToolBarTitle = function(title) {
    PhoneGap.exec("NativeControls.setToolBarTitle" , title );
};
 
 
/**
 * Create a new tool bar button item for use on a previously created tool bar.  Use ::showToolBar to show the new item on the tool bar.
 *
 * If the supplied image name is one of the labels listed below, then this method will construct a button
 * using the standard system buttons.  Note that if you use one of the system images, that the title you supply will be ignored.
 *
 * <b>Tool Bar Buttons</b>
 * UIBarButtonSystemItemDone
 * UIBarButtonSystemItemCancel
 * UIBarButtonSystemItemEdit
 * UIBarButtonSystemItemSave
 * UIBarButtonSystemItemAdd
 * UIBarButtonSystemItemFlexibleSpace
 * UIBarButtonSystemItemFixedSpace
 * UIBarButtonSystemItemCompose
 * UIBarButtonSystemItemReply
 * UIBarButtonSystemItemAction
 * UIBarButtonSystemItemOrganize
 * UIBarButtonSystemItemBookmarks
 * UIBarButtonSystemItemSearch
 * UIBarButtonSystemItemRefresh
 * UIBarButtonSystemItemStop
 * UIBarButtonSystemItemCamera
 * UIBarButtonSystemItemTrash
 * UIBarButtonSystemItemPlay
 * UIBarButtonSystemItemPause
 * UIBarButtonSystemItemRewind
 * UIBarButtonSystemItemFastForward
 * UIBarButtonSystemItemUndo,        // iOS 3.0 and later
 * UIBarButtonSystemItemRedo,        // iOS 3.0 and later
 * UIBarButtonSystemItemPageCurl,    // iOS 4.0 and later
 * @param {String} name internal name to refer to this tab by
 * @param {String} [title] title text to show on the button, or null if no text should be shown
 * @param {String} [image] image filename or internal identifier to show, or null if now image should be shown
 * @param {Object} [options] Options for customizing the individual tab item [no option available at this time - this is for future proofing]
 *  
 */
NativeControls.prototype.createToolBarItem = function(name , title , image , options) {
        var toolBarIndex = this.toolBarIndexes++;
        if (options && 'onTap' in options && typeof(options['onTap']) == 'function') {
        this.toolBarCallbacks[toolBarIndex] = {'onTap':options.onTap,'name':name};
        //delete options.onSelect;
    }
        //modify the NativeControls.m to change the options quickly
        // the instance name on the plugin can be passed with option for now it is hardcode in objc // Emile
    PhoneGap.exec("NativeControls.createToolBarItem" , name , title , image , options );
};
 
/**
 * Function called when a tool bar item has been tapped.
 * @param {Number} tag the tag number for the item that has been selected
 */
NativeControls.prototype.toolBarButtonTapped = function(tag)
{
        this.tappedToolBarItem = tag;
    if (typeof(this.toolBarCallbacks[tag].onTap) == 'function')
        this.toolBarCallbacks[tag].onTap(this.toolBarCallbacks[tag].name);
};
 
 
 
 
 
NativeControls.prototype.createActionSheet = function(buttonTitles,actionSheetTitle,cancelButtonIndex,destructiveButtonIndex)
{
        var options = {};
       
        if(actionSheetTitle != null)
        {
                options.title = actionSheetTitle;
        }
        if(cancelButtonIndex != null)
        {
                options.cancelButtonIndex = cancelButtonIndex;
        }
        if(destructiveButtonIndex != null)
        {
                options.destructiveButtonIndex = destructiveButtonIndex;
        }
   
        var params = [ "NativeControls.createActionSheet",options ];
    for (var i = 0; i < buttonTitles.length; i++)
        {
        params.push(buttonTitles[i]);
    }
    PhoneGap.exec.apply(this, params);
       
        this.actionSheetDelegate = {};
        return this.actionSheetDelegate;
}
 
 
NativeControls.prototype._onActionSheetDismissed = function(index)
{
        this.actionSheetDelegate.onActionSheetDismissed(index);
}
 
 
 
NativeControls.prototype.setStatusBarVisibilty = function(bHide)
{
        PhoneGap.exec("StatusBar.setHidden",bHide);
}
 
 
if(!window.plugins)
  window.plugins = {};
 
 window.plugins.nativeControls = new NativeControls();


// END NATIVE CONTROLS //////////////////////////////////////////////////////
    // CHILD BROWSER ////////////////////////////////////////////////////////////
    /* MIT licensed */
    // (c) 2010 Jesse MacFadyen, Nitobi
    /*global PhoneGap */

    function ChildBrowser() {
        // Does nothing
        }

    // Callback when the location of the page changes
    // called from native
    ChildBrowser._onLocationChange = function(newLoc)
    {
        window.plugins.childBrowser.onLocationChange(newLoc);
    };

    // Callback when the user chooses the 'Done' button
    // called from native
    ChildBrowser._onClose = function()
    {
        window.plugins.childBrowser.onClose();
    };

    // Callback when the user chooses the 'open in Safari' button
    // called from native
    ChildBrowser._onOpenExternal = function()
    {
        window.plugins.childBrowser.onOpenExternal();
    };

    // Pages loaded into the ChildBrowser can execute callback scripts, so be careful to
    // check location, and make sure it is a location you trust.
    // Warning ... don't exec arbitrary code, it's risky and could fuck up your app.
    // called from native
    ChildBrowser._onJSCallback = function(js, loc)
    {
        // Not Implemented
        //window.plugins.childBrowser.onJSCallback(js,loc);
        };

    /* The interface that you will use to access functionality */

    // Show a webpage, will result in a callback to onLocationChange
    ChildBrowser.prototype.showWebPage = function(loc)
    {
        PhoneGap.exec("ChildBrowserCommand.showWebPage", loc);
    };

    // close the browser, will NOT result in close callback
    ChildBrowser.prototype.close = function()
    {
        PhoneGap.exec("ChildBrowserCommand.close");
    };

    // Not Implemented
    ChildBrowser.prototype.jsExec = function(jsString)
    {
        // Not Implemented!!
        //PhoneGap.exec("ChildBrowserCommand.jsExec",jsString);
        };

    // Note: this plugin does NOT install itself, call this method some time after deviceready to install it
    // it will be returned, and also available globally from window.plugins.childBrowser
    ChildBrowser.install = function()
    {
        if (!window.plugins) {
            window.plugins = {};
        }

        window.plugins.childBrowser = new ChildBrowser();
        return window.plugins.childBrowser;
    };


    // END CHILD BROWSER ////////////////////////////////////////////////////////
    // EMAIL COMPOSER ///////////////////////////////////////////////////////////
    // window.plugins.emailComposer
    function EmailComposer()
    {
        this.resultCallback = null;
        // Function
    }

    EmailComposer.ComposeResultType =
    {
        Cancelled: 0,
        Saved: 1,
        Sent: 2,
        Failed: 3,
        NotSent: 4
    }



    // showEmailComposer : all args optional
    EmailComposer.prototype.showEmailComposer = function(subject, body, toRecipients, ccRecipients, bccRecipients, bIsHTML)
    {
        var args = {};
        if (toRecipients)
        args.toRecipients = toRecipients;
        if (ccRecipients)
        args.ccRecipients = ccRecipients;
        if (bccRecipients)
        args.bccRecipients = bccRecipients;
        if (subject)
        args.subject = subject;
        if (body)
        args.body = body;
        if (bIsHTML)
        args.bIsHTML = bIsHTML;

        PhoneGap.exec("EmailComposer.showEmailComposer", args);
    }

    // this will be forever known as the orch-func -jm
    EmailComposer.prototype.showEmailComposerWithCB = function(cbFunction, subject, body, toRecipients, ccRecipients, bccRecipients, bIsHTML)
    {
        this.resultCallback = cbFunction;
        this.showEmailComposer.apply(this, [subject, body, toRecipients, ccRecipients, bccRecipients, bIsHTML]);
    }

    EmailComposer.prototype._didFinishWithResult = function(res)
    {
        this.resultCallback(res);
    }



    PhoneGap.addConstructor(function()
    {
        if (!window.plugins)
        {
            window.plugins = {};
        }
        window.plugins.emailComposer = new EmailComposer();
    });

    // END EMAIL COMPOSER ///////////////////////////////////////////////////////

    /**
* Install ChildBrowser, etc.
*/
    var root = this;
    var cb = ChildBrowser.install();

    function onCloseBrowser() {
        alert("In index.html child browser closed");
    }

    function locChanged(loc) {
        alert("In index.html new loc = " + loc);
    }

    function onOpenExternal() {
        alert("In index.html onOpenExternal");
    }


    /**
* Instantiate the TabBar
*/
    window.plugins.nativeControls.createTabBar();
    window.plugins.nativeControls.createTabBarItem("id_tab1", "About", "www/img/tabbar-about.png",
    {
        onSelect: function() {
            $.mobile.changePage("about.html", "slideup");
        }

    });
    window.plugins.nativeControls.createTabBarItem("id_tab2", "Routes", "www/img/tabbar-routes.png",
    {
        onSelect: function() {
            $.mobile.changePage("routes.html", "slideup");
        }

    });
    window.plugins.nativeControls.createTabBarItem("id_tab3", "Maps", "www/img/tabbar-map.png",
    {
        onSelect: function() {
            $.mobile.changePage("maps.html", "slideup");
        }

    });
    window.plugins.nativeControls.createTabBarItem("id_tab4", "Schedules", "www/img/tabbar-schedules.png",
    {
        onSelect: function() {
            $.mobile.changePage("schedules.html", "slideup");
        }

    });
    window.plugins.nativeControls.showTabBarItems("id_tab1", "id_tab2",
    "id_tab3", "id_tab4");

    window.plugins.nativeControls.showTabBar();

}