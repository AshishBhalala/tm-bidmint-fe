import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface ProposalFormProps {
	someProp: string;
}

const ProposalForm: React.FC<ProposalFormProps> = () => {
	return (
		<div>
			<p>Buyer proposal</p>
		</div>
	);
};

export default ProposalForm;
