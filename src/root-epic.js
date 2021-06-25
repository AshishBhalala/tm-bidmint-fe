import { BehaviorSubject, from } from 'rxjs';
import { createEpicMiddleware, ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { excuteSaveProposalForm, excutePublishProposal} from 'views/buyer/buyer-proposal-form/proposalForm.epic';
import { saveBidEpic, publishBidEpic, getBidsBySellerEpic, getBidInfoEpic } from 'views/selller/seller-dashboard/sellerDashboard.epic';
import { saveProposalEpic, publishProposalEpic, getProposalEpic, getProposalInfoEpic } from 'views/buyer/buyer-dashboard/buyerDashboard.epic';


export const epic$ = new BehaviorSubject(
	combineEpics(
		saveBidEpic, 
		publishBidEpic, 
		getBidsBySellerEpic, 
		getBidInfoEpic,
		saveProposalEpic,
		publishProposalEpic,
		getProposalEpic,
		getProposalInfoEpic,
		excuteSaveProposalForm,
		excutePublishProposal
		));
export const dependencies = { getJSON: ajax.getJSON };

export const epicMiddleWare = createEpicMiddleware({ dependencies });

export const rootEpic = (action$, ...rest) =>
	epic$.pipe(
		mergeMap(epic =>
			epic(action$, ...rest).pipe(
				takeUntil(action$.pipe(ofType('EPIC_END')))
			)
		)
	);
