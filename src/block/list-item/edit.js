// Import dependencies
const { __ } = wp.i18n;
const { registerBlockType, switchToBlockType } = wp.blocks;
const { InnerBlocks, BlockControls } = wp.editor;
const { Toolbar, ToolbarButton, Path, SVG } = wp.components;
const { Fragment, Component } = wp.element;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

// Constants
const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/image',
	'core/heading'
];

export class DescriptionListItemEdit extends Component {
	constructor() {
		super( ...arguments );
	}

	getAllowedBlocks() {
  	// Dont allow headings if is dt
  	if (this.props.attributes.isTerm) {
  		return ALLOWED_BLOCKS.filter(block => block !== 'core/heading');
  	}

  	return ALLOWED_BLOCKS;
  }

	convertTag() {
		// If coverting to term
		if (!this.props.attributes.isTerm) {
			// Get heading block
			this.props.onTransformType('core/paragraph', 'core/heading');
		}

		// Update tag
		this.props.setAttributes( { isTerm: !this.props.attributes.isTerm } );
  }

	render() {
		const { block, onDeleteSelf, attributes } = this.props;
		const { isTerm } = attributes;

    // Set some variables
    const tagName = isTerm ? 'dt' : 'dd';
		const swapIcon = <SVG className="editor-block-switcher__transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M6.5 8.9c.6-.6 1.4-.9 2.2-.9h6.9l-1.3 1.3 1.4 1.4L19.4 7l-3.7-3.7-1.4 1.4L15.6 6H8.7c-1.4 0-2.6.5-3.6 1.5l-2.8 2.8 1.4 1.4 2.8-2.8zm13.8 2.4l-2.8 2.8c-.6.6-1.3.9-2.1.9h-7l1.3-1.3-1.4-1.4L4.6 16l3.7 3.7 1.4-1.4L8.4 17h6.9c1.3 0 2.6-.5 3.5-1.5l2.8-2.8-1.3-1.4z" /></SVG>;

		// if ( ! blocks || ! blocks.length ) {
		// 	return null;
		// }

		return (
      <Fragment>
        <BlockControls>
          <Toolbar
						controls={ [
							{
								icon: swapIcon,
								title: __( 'Convert to' ) + (isTerm ? ' dd' : ' dt'),
								onClick: () => {
									this.convertTag();
								},
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
	          allowedBlocks={ this.getAllowedBlocks() }
	          templateLock={ false }
	        />
        </div>
      </Fragment>
		);
	}
}

export default compose(
	withSelect( ( select, ownProps ) => {
		const {
			getBlock
		} = select( 'core/editor' );

		return {
			block: getBlock( ownProps.clientId )
		};
	} ),

	withDispatch( ( dispatch, ownProps ) => {
		const {
			replaceBlocks,
			removeBlock
		} = dispatch( 'core/editor' );

		const { block, clientId } = ownProps;

		return {
			onDeleteSelf() {
				removeBlock(
					ownProps.clientId,
					false
				);
			},

			onTransformType( to, from ) {
				const clientIds = block.innerBlocks.map(el => el.clientId);

				// Convert all heading blocks to paragraph blcoks
				const convertedBlocks = block.innerBlocks.map(el => {
					if (el.name === from) {
						return switchToBlockType( el, to )[0];
					}

					return el;
				});

				replaceBlocks(
					clientIds,
					convertedBlocks
				);
			},
		};
	}),
)( DescriptionListItemEdit );
