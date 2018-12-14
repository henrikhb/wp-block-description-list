//  Import CSS.
import './style.scss';
import './editor.scss';

// Import dependencies
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { InnerBlocks, BlockControls } = wp.editor;
const { Dashicon, Toolbar, ToolbarButton } = wp.components;
const { Fragment } = wp.element;
const { select, dispatch } = wp.data;

// Import local dependencies
import './list-term';
import './list-description';

// Constants
const ALLOWED_BLOCKS = [
	'lmt/description-list-term',
	'lmt/description-list-description'
];


registerBlockType( 'lmt/description-list', {
	title: __( 'Description list' ),
	description: __( 'Create a description list.' ),
	icon: 'feedback',
	category: 'common',
	keywords: [ __( 'description list' ) ],

  edit({ clientId }) {
    // Add Row
    const onAddRow = type => {
      // Create a new block
      const block = type === 'dt' ? createBlock('lmt/description-list-term') : createBlock('lmt/description-list-description');

      // Insert the block
      // TODO: Add position to insertion?
      dispatch('core/editor').insertBlock(block, undefined, clientId)
    }

    // Add block if no blocks already exist.
    if (! select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.length) {
      onAddRow('dt');
    }

    return (
      <Fragment>
        <InnerBlocks
          allowedBlocks={ ALLOWED_BLOCKS }
          templateLock="insert"
        />

        <div className="DL__inserters">
	        <button
	          onClick={ () => { onAddRow('dt') } }
	          className="DL__inserters__btn"
	        >
	          <Dashicon
	            icon={ 'plus' }
	          />
	          <span>{ __( 'Add term' ) }</span>
	        </button>

	        <button
	          onClick={ () => { onAddRow('dd') } }
	          className="DL__inserters__btn"
	        >
	          <Dashicon
	            icon={ 'plus' }
	          />
	          <span>{ __( 'Add description' ) }</span>
	        </button>
        </div>
      </Fragment>
    );
  },

  save() {
    return <dl><InnerBlocks.Content /></dl>;
  }
} );
