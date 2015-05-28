// JavaScript Document
$(function(){
	//$("#pageSearch").hide();
	$("#slidedown").hide();
	
	$("#menu1").on("click",function(){
		$("#slidedown").slideToggle("slow");
		});
		// Initalize search panel list and filter also remove collapsibles
	$( this ).find( ".jqm-search ul.jqm-list" ).html( searchContents ).listview({
		inset: false,
		theme: null,
		dividerTheme: null,
		icon: false,
		autodividers: true,
		autodividersSelector: function ( li ) {
			return "";
		},
		arrowKeyNav: true,
		enterToNav: true,
		highlight: true,
		submitTo: searchUrl
	}).filterable();

	// Initalize search page list and remove collapsibles
	$( this ).find( ".jqm-search-results-wrap ul.jqm-list" ).html( searchContents ).listview({
		inset: true,
		theme: null,
		dividerTheme: null,
		icon: false,
		arrowKeyNav: true,
		enterToNav: true,
		highlight: true
	}).filterable();

	// Fix links on homepage to point to sub directories
	if ( $( event.target ).hasClass( "jqm-home") ) {
		$( this ).find( "a" ).each( function() {
			$( this ).attr( "href", $( this ).attr( "href" ).replace( "../", "" ) );
		});
	}

	// Search results page get search query string and enter it into filter then trigger keyup to filter
	if ( $( event.target ).hasClass( "jqm-demos-search-results") ) {
		search = $.mobile.path.parseUrl( window.location.href ).search.split( "=" )[ 1 ];
		setTimeout(function() {
			e = $.Event( "keyup" );
			e.which = 65;
			$( that ).find( ".jqm-content .jqm-search-results-wrap input" ).val( search ).trigger(e).trigger( "change" );
		}, 0 );
	}
});

// Append keywords list to each list item
$( document ).one( "pagecreate", ".jqm-demos", function( event ) {
	$( this ).find( ".jqm-search-results-list li, .jqm-search li" ).each(function() {
		var text = $( this ).attr( "data-filtertext" );

		$( this )
			.find( "a" )
			.append( "<span class='jqm-search-results-keywords ui-li-desc'>" + text + "</span>" );
	});
});

// Functions for highlighting text used for keywords highlight in search
jQuery.fn.highlight = function( pat ) {
	function innerHighlight( node, pat ) {
		var skip = 0;
		if ( node.nodeType == 3 ) {
			var pos = node.data.toUpperCase().indexOf( pat );
			if ( pos >= 0 ) {
				var spannode = document.createElement( "span" );
				spannode.className = "jqm-search-results-highlight";
				var middlebit = node.splitText( pos );
				var endbit = middlebit.splitText( pat.length );
				var middleclone = middlebit.cloneNode( true );
				spannode.appendChild( middleclone );
				middlebit.parentNode.replaceChild( spannode, middlebit );
				skip = 1;
			}
		} else if ( node.nodeType == 1 && node.childNodes && !/(script|style)/i.test( node.tagName ) ) {
			for ( var i = 0; i < node.childNodes.length; ++i ) {
				i += innerHighlight( node.childNodes[i], pat );
			}
		}
		return skip;
	}
	return this.length && pat && pat.length ? this.each(function() {
		innerHighlight( this, pat.toUpperCase() );
	}) : this;
};

// Function to remove highlights in text
jQuery.fn.removeHighlight = function() {
	return this.find( "span.jqm-search-results-highlight" ).each(function() {
		this.parentNode.firstChild.nodeName;
		with ( this.parentNode ) {
			replaceChild( this.firstChild, this );
			normalize();
		}
	}).end();
};
