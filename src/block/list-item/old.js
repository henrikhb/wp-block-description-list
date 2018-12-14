// Import dependencies
const { __ } = wp.i18n;
const { registerBlockType, switchToBlockType } = wp.blocks;
const { InnerBlocks, BlockControls } = wp.editor;
const { Toolbar, ToolbarButton, Path, SVG } = wp.components;
const { Fragment } = wp.element;
const { dispatch, select } = wp.data;

// Constants
const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/image',
	'core/heading'
];

import DescriptionListItemEdit from './edit';

// Register description list item
registerBlockType( 'lmt/description-list-item', {
  title: __( 'Description list item' ),
  parent: [ 'lmt/description-list' ],
  icon: 'feedback',
  description: __( 'Description list term/description.' ),
  category: 'common',
  attributes: {
		isTerm: {
			type: 'boolean',
			default: true,
		},
  },

  edit({ attributes, setAttributes, clientId }) {
  	console.log('render');
  	const { isTerm } = attributes;

  	// Functions
    // Delete this item
    const onDeleteSelf = () => {
      dispatch('core/editor').removeBlock(clientId, false);
    }

    // Build allowed blocks
    const getAllowedBlocks = () => {
    	// Dont allow headings if is dt
    	if (isTerm) {
    		return ALLOWED_BLOCKS.filter(block => block !== 'core/heading');
    	}

    	return ALLOWED_BLOCKS;
    }

    // Handle tag switch
    const convertTag = () => {
			// If coverting to term
			if (!isTerm) {
				// Select all inner blocks
				const blocks = select( 'core/editor' ).getBlocks(clientId);

				// Get heading blocks
				let headingBlocks = blocks.filter(block => block.name === 'core/heading');


				// Filter out only heading clientIds
				let headingBlockIds = headingBlocks.map(block => block.clientId);

				// Convert all heading blocks to paragraph blcoks
				const convertedBlocks = headingBlocks.map(block => {
					return switchToBlockType( block, 'core/paragraph' )[0];
				});

				console.log(convertedBlocks);

				// Replace existing blocks with new blocks
				dispatch( 'core/editor' ).replaceBlocks(
					headingBlockIds,
					convertedBlocks
				);
			}

			// Update tag
			setAttributes( { isTerm: !isTerm } );
    }

    // Set tagName
    const tagName = isTerm ? 'dt' : 'dd';

		const swapIcon = <SVG className="editor-block-switcher__transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M6.5 8.9c.6-.6 1.4-.9 2.2-.9h6.9l-1.3 1.3 1.4 1.4L19.4 7l-3.7-3.7-1.4 1.4L15.6 6H8.7c-1.4 0-2.6.5-3.6 1.5l-2.8 2.8 1.4 1.4 2.8-2.8zm13.8 2.4l-2.8 2.8c-.6.6-1.3.9-2.1.9h-7l1.3-1.3-1.4-1.4L4.6 16l3.7 3.7 1.4-1.4L8.4 17h6.9c1.3 0 2.6-.5 3.5-1.5l2.8-2.8-1.3-1.4z" /></SVG>;

    return (
      <Fragment>
        <BlockControls>
          <Toolbar
						controls={ [
							{
								icon: swapIcon,
								title: __( 'Convert to' ) + (isTerm ? ' dd' : ' dt'),
								onClick: convertTag,
							},
						] }
          >
            <ToolbarButton
              className="components-toolbar__control"
              label={ __( 'Delete row' ) }
              title={ __( 'Delete row' ) }
              icon="no"
              onClick={ onDeleteSelf }
            />
          </Toolbar>
        </BlockControls>
        <div className={ `DL__${tagName}` }>
	        <InnerBlocks
	          allowedBlocks={ getAllowedBlocks() }
	          templateLock={ false }
	        />
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
  	const { isTerm } = attributes;

  	if (isTerm) {
  		return <dt><InnerBlocks.Content /></dt>;
  	}

  	return <dd><InnerBlocks.Content /></dd>;
  }
} );
