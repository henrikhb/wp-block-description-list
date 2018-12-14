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

  edit: DescriptionListItemEdit,

  save({ attributes }) {
  	const { isTerm } = attributes;

  	if (isTerm) {
  		return <dt><InnerBlocks.Content /></dt>;
  	}

  	return <dd><InnerBlocks.Content /></dd>;
  }
} );
