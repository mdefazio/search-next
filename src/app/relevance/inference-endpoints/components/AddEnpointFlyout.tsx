import React, { useState } from 'react';
import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
  EuiText,
  EuiTitle,
  EuiCodeBlock,
  useGeneratedHtmlId,
} from '@elastic/eui';

export const AddEndpointFlyout = () => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const simpleFlyoutTitleId = useGeneratedHtmlId({
    prefix: 'simpleFlyoutTitle',
  });
  let flyout;

  if (isFlyoutOpen) {
    flyout = (
      <EuiFlyout
        ownFocus
        onClose={() => setIsFlyoutOpen(false)}
        aria-labelledby={simpleFlyoutTitleId}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id={simpleFlyoutTitleId}>Add inference endpoint</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>This is the Add Inference Endpoint Flyout</p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }

  return (
    <div>
      <EuiButton
        iconSide='left'
        iconType="plusInCircle"
        onClick={() => setIsFlyoutOpen(true)}
      >
        Add endpoint
      </EuiButton>
      {flyout}
    </div>
  )
}


