// Import dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

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
