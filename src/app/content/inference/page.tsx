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


const items: InferenceType[] = [
  {
    inference_id: "elser_model",
    service_settings: "4 / 2",
    provider: 'elasticsearch',
    indices: 4,
  },
  {
    inference_id: "multilingual_e5_base",
    service_settings: "4 / 2",
    provider: 'Cohere',
    indices: 4,
  },
  {
    inference_id: "multilingual_e5_base",
    service_settings: "4 / 2",
    provider: 'elasticsearch',
    indices: 4,
  },
  {
    inference_id: "hugging-face-gpt2",
    service_settings: ".../model/gpt2",
    provider: "Hugging Face",
    indices: 4,
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
        <EuiText size="m"><p><strong>{main}</strong></p></EuiText>
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
    field: "provider",
    render: (provider: string) => (
      <RowRender main={provider} secondary={provider === 'elser' ? "sparse-embedding" : "text-embedding"} />
    )
  },
  {
    name: "Indices",
    field: "indices",
    width: '80px',
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
        icon: 'pencil',
        type: 'icon',
        description: 'This is the action',
        onClick: () => (console.log('click'))
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
          <EuiButton fill iconSide='left' iconType="plusInCircle" key="add-model">Add endpoint</EuiButton>,
          <EuiButtonEmpty key="manage-models">API Documentation</EuiButtonEmpty>,
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
