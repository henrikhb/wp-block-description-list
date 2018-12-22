//  Import CSS.
import './style.scss';
import './editor.scss';

// Import dependencies
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { InnerBlocks, BlockControls } = wp.editor;
const { Dashicon, Toolbar, ToolbarButton, Button, ButtonGroup } = wp.components;
const { Fragment } = wp.element;
const { select, dispatch } = wp.data;

// Import local dependencies
import './list-item';

// Constants
const ALLOWED_BLOCKS = [
	'lmt/description-list-item'
];


registerBlockType( 'lmt/description-list', {
	title: __( 'Description list' ),
	description: __( 'Create a description list.' ),
	icon: 'feedback',
	category: 'common',
	keywords: [ __( 'description list' ) ],

  edit({ clientId }) {
    // Add Row
    const onAddRow = isTerm => {
      // Create a new block
      const block = createBlock('lmt/description-list-item', {
      	isTerm: isTerm
      });

      // Insert the block
      dispatch('core/editor').insertBlock(block, undefined, clientId)
    }

    // Add block if no blocks already exist.
    if (! select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.length) {
      onAddRow(true);
    }

    return (
      <Fragment>
        <InnerBlocks
          allowedBlocks={ ALLOWED_BLOCKS }
          templateLock="insert"
        />

				<ButtonGroup>
					<Button
						isDefault
						isLarge
						onClick={ () => { onAddRow(true) } }
					>{ __( 'Add term' ) }</Button>

					<Button
						isDefault
						isLarge
						onClick={ () => { onAddRow(false) } }
					>{ __( 'Add description' ) }</Button>
				</ButtonGroup>
      </Fragment>
    );
  },

  save() {
    return <dl><InnerBlocks.Content /></dl>;
  }
} );
