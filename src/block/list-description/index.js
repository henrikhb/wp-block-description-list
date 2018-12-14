// Import dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, BlockControls } = wp.editor;
const { Toolbar, ToolbarButton } = wp.components;
const { Fragment } = wp.element;
const { dispatch } = wp.data;

// Constants
const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/image'
];

// Register description list item
registerBlockType( 'lmt/description-list-description', {
  title: __( 'Description list item' ),
  parent: [ 'lmt/description-list' ],
  icon: 'feedback',
  description: __( 'Description list term and description grouping in description list.' ),
  category: 'common',
  attributes: {},

  edit({ clientId }) {

    // Delete this row
    const onDeleteSelf = () => {
      dispatch('core/editor').removeBlock(clientId, false);
    }

    return (
      <Fragment>
        <BlockControls>
          <Toolbar>
            <ToolbarButton
              className="components-toolbar__control"
              label={ __( 'Delete row' ) }
              title={ __( 'Delete row' ) }
              icon="no"
              onClick={ onDeleteSelf }
            />
          </Toolbar>
        </BlockControls>
        <dd className="DL__description">
	        <InnerBlocks
	          allowedBlocks={ ALLOWED_BLOCKS }
	          templateLock={ false }
	        />
        </dd>
      </Fragment>
    );
  },

  save() {
  	return <dd><InnerBlocks.Content /></dd>;
  }
} );
