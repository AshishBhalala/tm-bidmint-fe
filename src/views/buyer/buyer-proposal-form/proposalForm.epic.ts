import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AjaxResponse, AjaxError } from 'rxjs/ajax';
import { get, post } from '__utils/ajax-wrapper';
import { FluxStandardAction } from '__utils/type';
import { message } from 'antd';
import * as Actions from 'constant/action';

// export const excuteSaveProposalForm : Epic< FluxStandardAction, FluxStandardAction> = (action$) => {
//     return action$.pipe(
//         ofType(Actions.SAVE_PROPOSAL_FORM),
//         mergeMap((action) => {
//             return post("motor.pt.com",action.payload).pipe(
//                 map(
//                     (response: AjaxResponse | AjaxError) : FluxStandardAction => {

//                     }
//                 )
//             )
//         })
//     )
// }
