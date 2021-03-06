( function( global ) 
{
	'use strict';
	let pie = global.pie = global.pie || { };

	// Init scope
	if( !pie.utils ) { pie.utils = { }; }
	if( pie.utils.Tabs ) { console.warn( 'pie.utils.Tabs is already defined.' ); return; }

	// Tabs
	pie.utils.Tabs =
	class Tabs 
	{
		//
		constructor( editor ) 
		{
			this.editor = editor;
		}
		
		// Loading the contents of tabs
		load( )
		{
			const context = this;

			// Get tabs parameters
			this.editor._getConfig( 'tabs', function( config ) 
			{
				// Calling the load event of the tab in the required module
				// @todo: Here we need to filter tabs depending on the settings of the editor
				let data = { };
				for( let tabID in config ) 
				{
					let tabName = tabID.charAt( 0 ).toUpperCase( ) + tabID.slice( 1 );

					//
					if( pie.tabs.hasOwnProperty( tabID ) ) { context.editor.tabs[ tabID ] = new pie.tabs[ tabID ]( context.editor ); }
					else if( pie.tabs.hasOwnProperty( tabName ) ) { context.editor.tabs[ tabID ] = new pie.tabs[ tabName ]( context.editor ); }

					//
					data[ tabID ] = context._callFunction( tabID, 'loadTab', [ config[ tabID ] ] ); 
				}

				// Template render
				const sidebarTemplate = context.editor.utils.template.render( 'sidebar.tpl', { 'tabs': data } );

				//
				const $sidebar = context.editor.$elements.sidebar;

				// Display the template data
				$sidebar.html( sidebarTemplate )
						.on( 'click', '#navigation a[pie-target-tab]', function( event ) 
				{
					var targetTab = $( this ).attr( 'pie-target-tab' );
					
					// Tab activation
					context._callFunction( targetTab, 'activateTab', [ ] );
				} );
			} );
		}

		// Calling a function from Tab
		_callFunction( tab, functionName, data )
		{	
			if( this.editor.tabs.hasOwnProperty( tab ) && this.editor.tabs[ tab ][ functionName ] !== undefined )
			{
				return this.editor.tabs[ tab ][ functionName ].apply( this.editor.tabs[ tab ], data );
			}
		}
	};

	// Base class of the tab
	pie.utils.BasicTab =
	class BasicTab
	{
		constructor( editor )
		{
			this.className = this.constructor.name.charAt(0).toLowerCase( ) + this.constructor.name.slice( 1 );
			this.editor = editor;
			this.canvas = editor.canvas;
			this.tab = editor.$elements.tab;
			this.data = { };
		}
		
		// Tab loading
		loadTab( data )
		{			
			this.data = data;
			this.data[ 'id' ] = this.className;

			return data;
		}

		// Tab activating
		activateTab( )
		{
			// Template render
			let templateHTML = this.editor.utils.template.render( 'tabs/' + this.className + '.tpl', this.data );

			// Apply template
			this.tab.html( templateHTML );
			
			// Set events
			this.setEvents( );
		}

		// Tab deactivating
		deactivateTab( )
		{
			this.tab.off( );
			// pie.utils.panels.hide( );
		}
		
		// Set events
		setEvents( )
		{
			const context = this;

			//
			this.tab.off( )
					.on( 'click', 'a[pie-action]', function( event ){ context._onTabItemClick( this, event ); } );
		}
		
		// Select Action Point
		_onTabItemClick( target, event )
		{
			const action = $( target ).attr( 'pie-action' ),
				args = $( target ).attr( 'pie-arguments' );

			// Call the function
			this._callFunction( action, [ ].concat( args ) );
		}

		// Calling a function by name
		_callFunction( functionName, data )
		{
			if( typeof this[ functionName ] === 'function' )
			{
				return this[ functionName ].apply( this, data );
			}
		}
	};
} )( window );