//  Import CSS.
import './style.scss';
import './editor.scss';

// Import dependencies
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { Button, ButtonGroup } = wp.components;
const { Fragment } = wp.element;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

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

  edit: compose(
	  withSelect( (select, ownProps) => {
	  	const {
	  		hasSelectedInnerBlock,
	  		getBlocksByClientId,
	  		getBlock
	  	} = select( 'core/editor' );

	  	// Get current block
	  	const block = getBlock(ownProps.clientId);

	    return {
	    	isParentOfSelectedBlock: hasSelectedInnerBlock( ownProps.clientId, true ),
	    	hasBlocks: block ? block.innerBlocks.length : false
	    };
	  } ),

		withDispatch( (dispatch, ownProps) => {
	  	const {
	  		insertBlock
	  	} = dispatch( 'core/editor' );

	    return {
	    	// Function for inserting new rows
	    	onAddRow(isTerm) {
		      // Create a new block
		      const block = createBlock('lmt/description-list-item', {
		      	isTerm: isTerm
		      });

		      insertBlock(block, undefined, ownProps.clientId);
	    	}
	    };
		})
  )( ({ clientId, isSelected, isParentOfSelectedBlock, hasBlocks, onAddRow }) => {
    // Add block if no blocks already exist.
    if (! hasBlocks ) {
      onAddRow(true);
    }

    // Inserter buttons
    const inserters = (isSelected || isParentOfSelectedBlock) && (
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
    );

    return (
      <Fragment>
        <InnerBlocks
          allowedBlocks={ ALLOWED_BLOCKS }
          templateLock="insert"
        />

        { inserters }
      </Fragment>
    );
  }),

  save() {
    return <dl><InnerBlocks.Content /></dl>;
  }
} );
