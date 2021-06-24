import React from 'react'
import { Card } from 'antd'
import { FormModel } from 'components/proposal-form'
import './index.css'

export default function ProposalForm() {
    
    return (
        <div id="insurerProgress">
            <Card title="Create Proposal Form">
                <FormModel></FormModel>
            </Card>
        </div>
    )
}
