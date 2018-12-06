//  Import CSS.
import './style.scss';
import './editor.scss';

// Import dependencies
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { RichText, InnerBlocks, BlockControls } = wp.editor;
const { Dashicon, Toolbar, ToolbarButton } = wp.components;
const { Fragment } = wp.element;
const { select, dispatch } = wp.data;

// Coonstants
const ALLOWED_FORMATTING = [ 'link' ];
const ALLOWED_BLOCKS = [ 'lmt/description-list-item' ];

registerBlockType( 'lmt/description-list', {
	title: __( 'Description list' ),
	description: __( 'Create a description list.' ),
	icon: 'feedback',
	category: 'common',
	keywords: [ __( 'description list' ) ],

  edit({ clientId }) {
    // Add Row
    const onAddRow = () => {
      // Create a new block
      const block = createBlock('lmt/description-list-item');

      // Insert the block
      // TODO: Add position to insertion?
      dispatch('core/editor').insertBlock(block, undefined, clientId)
    }

    // Add block if no blocks already exist.
    if (! select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.length) {
      onAddRow();
    }

    return (
      <Fragment>
        <BlockControls>
          <Toolbar>
            <ToolbarButton
              className="components-toolbar__control"
              label={ __( 'Add row' ) }
              title={ __( 'Add row' ) }
              icon="plus"
              onClick={ onAddRow }
            />
          </Toolbar>
        </BlockControls>
        <InnerBlocks
          allowedBlocks={ ALLOWED_BLOCKS }
          templateLock="insert"
        />
        <button
          onClick={ onAddRow }
          className="DL__btn"
        >
          <Dashicon
            icon={ 'plus' }
          />
          <span>{ __( 'Add row' ) }</span>
        </button>
      </Fragment>
    );
  },

  save() {
    return <dl><InnerBlocks.Content /></dl>;
  }
} );

// Register description list item
registerBlockType( 'lmt/description-list-item', {
  title: __( 'Description list item' ),
  parent: [ 'lmt/description-list' ],
  icon: 'feedback',
  description: __( 'Description list term and description grouping in description list.' ),
  category: 'common',
  attributes: {
    term: {
      type: 'string',
      selector: 'dt',
    },
    description: {
      type: 'string',
      selector: 'dd',
    },
  },

  edit({ attributes, setAttributes, clientId }) {
    const { term, description } = attributes;

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
        <div className="DL">
          <RichText
            tagName="dt"
            onChange={ value => {
              setAttributes( { term: value } );
            } }
            value={ term }
            placeholder={ __( 'Term' ) }
            multiline={ false }
            formattingControls={ ALLOWED_FORMATTING }
            wrapperClassName="DL__item DL__item--dt"
          />

          <RichText
            tagName="dt"
            onChange={ value => {
              setAttributes( { description: value } );
            } }
            value={ description }
            placeholder={ __( 'Description' ) }
            multiline={ false }
            formattingControls={ ALLOWED_FORMATTING }
            wrapperClassName="DL__item DL__item--dd"
          />
        </div>
      </Fragment>
    );

  },

  save({ attributes }) {
    const { term, description } = attributes;

    // Only render if has both term and description
    if (! RichText.isEmpty( term ) && ! RichText.isEmpty( description )) {
      return (
        <Fragment>
          <RichText.Content
            tagName="dt"
            value={ term }
          />
          <RichText.Content
            tagName="dd"
            value={ description }
          />
        </Fragment>
      );
    }

    return null;
  }
} );
