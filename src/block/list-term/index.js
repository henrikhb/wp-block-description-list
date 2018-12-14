// Import dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls } = wp.editor;
const { Toolbar, ToolbarButton } = wp.components;
const { Fragment } = wp.element;
const { dispatch } = wp.data;

// Constants
const ALLOWED_FORMATTING = [ 'link' ];

// Register description list item
registerBlockType( 'lmt/description-list-term', {
  title: __( 'Description list term' ),
  parent: [ 'lmt/description-list' ],
  icon: 'feedback',
  description: __( 'Description list term in description list.' ),
  category: 'common',
  attributes: {
    term: {
      type: 'string',
      selector: 'dt',
    },
  },

  edit({ attributes, setAttributes, clientId }) {
    const { term } = attributes;

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
              label={ __( 'Delete term' ) }
              title={ __( 'Delete term' ) }
              icon="no"
              onClick={ onDeleteSelf }
            />
          </Toolbar>
        </BlockControls>
        <RichText
          tagName="dt"
          onChange={ value => {
            setAttributes( { term: value } );
          } }
          value={ term }
          placeholder={ __( 'Term' ) }
          formattingControls={ ALLOWED_FORMATTING }
          unstableOnSplit={ () => {} }
          wrapperClassName="DL__term"
        />
      </Fragment>
    );

  },

  save({ attributes }) {
    const { term } = attributes;

    // Only render if has both term
    if (! RichText.isEmpty( term )) {
      return (
        <RichText.Content
          tagName="dt"
          value={ term }
        />
      );
    }

    return null;
  }
} );
