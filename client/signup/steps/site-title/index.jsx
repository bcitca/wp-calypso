/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import StepWrapper from 'signup/step-wrapper';
import SignupActions from 'lib/signup/actions';

import SignupSiteTitle from 'components/signup-site-title';
import SiteTitleExample from 'components/site-title-example';

import { setSiteTitle } from 'state/signup/steps/site-title/actions';

import { translate } from 'i18n-calypso';

const SiteTitleStep = React.createClass( {
	propTypes: {
		flowName: PropTypes.string,
		goToNextStep: PropTypes.func.isRequired,
		positionInFlow: PropTypes.number,
		setSiteTitle: PropTypes.func.isRequired,
		signupProgressStore: PropTypes.array,
		stepName: PropTypes.string,
	},

	submitSiteTitleStep( siteTitle ) {
		this.props.setSiteTitle( siteTitle );

		SignupActions.submitSignupStep( {
			processingMessage: translate( 'Setting up your site' ),
			stepName: this.props.stepName,
			siteTitle
		}, [], { siteTitle } );

		this.props.goToNextStep();
	},

	skipStep() {
		this.submitSiteTitleStep( '' );
	},

	renderSiteTitleStep() {
		return (
			<div>
				<SignupSiteTitle
					onSubmit={ this.submitSiteTitleStep }
				/>
				<SiteTitleExample />
			</div>
		);
	},
	render() {
		const headerText = translate( 'Give your new site a name.' );
		const subHeaderText = translate( 'Enter a Site Title that will be displayed for visitors. You can always change this later.' );

		return (
			<div>
				<StepWrapper
					flowName={ this.props.flowName }
					stepName={ this.props.stepName }
					positionInFlow={ this.props.positionInFlow }
					headerText={ headerText }
					fallbackHeaderText={ headerText }
					subHeaderText={ subHeaderText }
					fallbackSubHeaderText={ subHeaderText }
					signupProgressStore={ this.props.signupProgressStore }
					stepContent={ this.renderSiteTitleStep() }
					goToNextStep={ this.skipStep }
				/>
			</div>
		);
	}
} );

export default connect(
	null,
	{ setSiteTitle }
)( SiteTitleStep );
