'use client'
import React, { useState, ReactNode } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
//
//
import { InferenceType } from '../../../lib/definitions';

import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableSelectionType,
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageTemplate,
  EuiSearchBar,
  EuiTitle,
  EuiText,
  EuiTextTruncate,
  useEuiPaddingCSS,
  EuiBadge,
  EuiSpacer,
  EuiSplitPanel,
  useEuiBackgroundColor,
} from '@elastic/eui';
import { AddEndpointFlyout } from './components/AddEnpointFlyout';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';


const items: InferenceType[] = [
  {
    inference_id: "elser_model",
    service_settings: "4 / 2",
    provider: 'elser',
    modelType: 'sparse-embedding',
  },
  {
    inference_id: "multilingual_e5_base",
    service_settings: "4 / 2",
    provider: 'Cohere',
    modelType: 'text-embedding',
  },
  {
    inference_id: "multilingual_e5_base",
    service_settings: "4 / 2",
    provider: 'elasticsearch',
    modelType: 'text-embedding',
  },
  {
    inference_id: "hugging-face-gpt2",
    service_settings: ".../model/gpt2",
    provider: "Hugging Face",
    modelType: 'text-embedding',
  },
]

interface RowRenderProps {
  main: string,
  secondary: string,
  bold?: boolean
}

const RowRender = ({ main, secondary, bold }: RowRenderProps) => {
  return (
    <EuiFlexGroup gutterSize='xs' direction='column' alignItems='flexStart'>
      {bold ?
        <EuiText size="s"><p><strong>{main}</strong></p></EuiText>
        : <EuiText size="s"><p>{main}</p></EuiText>
      }

      <EuiText size="s" color='subdued'><p>{secondary}</p></EuiText>
    </EuiFlexGroup >
  )
}

const columns: Array<EuiBasicTableColumn<InferenceType>> = [
  {
    name: "Name",
    field: "inference_id",
    render: (inference_id: string, value) => (
      <RowRender main={inference_id} secondary={value.service_settings} bold />
    )
  },
  {
    name: "Provider",
    width: "260px",
    field: "provider",
    render: (provider: string) => (
      <EuiText size="s"><p>{provider}</p></EuiText>
    )
  },
  {
    name: "Type",
    width: "260px",
    field: "modelType",
    render: (modelType: string) => (
      <EuiBadge color='hollow'>{modelType}</EuiBadge>
    )
  },
  {
    name: "Actions",
    width: "160px",
    actions: [
      {
        name: <span>Actions</span>,
        icon: 'eye',
        type: 'icon',
        description: 'This is the action',
        onClick: () => (console.log('click'))
      },
      {
        name: <span>Actions</span>,
        icon: 'trash',
        type: 'icon',
        description: 'This is the action',
        onClick: () => (<ConfirmDeleteModal />)
      },
    ]
  }
]


export default function InferenceEndpoints() {
  const [selectedItems, setSelectedItems] = useState<InferenceType[]>([]);

  const onSelectionChange = (selectedItems: InferenceType[]) => {
    setSelectedItems(selectedItems);
  };

  const TableUtilityBar = () => {
    const paddingStyles = useEuiPaddingCSS('vertical');
    // const cssStyles = css(paddingStyles['m']);

    return (
      <div><EuiText size="s"><p>{`Showing 1-${items.length} of ${items.length}`}</p></EuiText></div>
    )
  }

  return (
    <>
      <EuiPageTemplate.Header
        pageTitle="Inference Endpoints"
        description="Manage your Elastic and third-party endpoints generated from the Inference API."
        rightSideItems={[
          <AddEndpointFlyout key="infernece-flyout" />,
          <EuiButtonEmpty key="api-docs">API Documentation</EuiButtonEmpty>,
          <EuiButtonEmpty key="manage-models">Trained Models</EuiButtonEmpty>
        ]}
      />
      <EuiPageTemplate.Section>
        <EuiFlexGroup gutterSize='s'>
          <EuiFlexItem>
            <EuiSearchBar />
          </EuiFlexItem>
          <EuiFlexItem>
            Filters
          </EuiFlexItem>
        </EuiFlexGroup>

        <TableUtilityBar />
        <EuiBasicTable
          isSelectable={true}
          items={items}
          columns={columns}
        />
      </EuiPageTemplate.Section>
    </>
  )
}
