'use client'
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
//
//
import { InferenceType } from '@/lib/definitions';

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
    model: ".elser_model_2",
    model_config: "2 vCPU · 4GB",
    request_total: 12,
    request_errors: 1,
    provider: 'elasticsearch',
    indices: 4,
  },
  {
    inference_id: "multilingual_e5_base",
    model: ".multiingual-e5-base",
    model_config: "2 vCPU · 4GB",
    request_total: 2,
    request_errors: 1,
    provider: 'elasticsearch',
    indices: 4,
  },
  {
    inference_id: "cohere-embed-english-v3-0-puk",
    model: "Cohere/Cohere-embed-english-v3.0",
    model_config: "1x GPU · 16GB",
    request_total: 1282,
    request_errors: 28,
    provider: "Hugging Face",
    indices: 4,
  },
]
interface ModelRenderProps {
  model: string,
  model_config: string
}

const ModelRender = ({ model, model_config }: ModelRenderProps) => {

  // const bgColor = "#f7f8fc"
  return (
    <EuiFlexGroup gutterSize='xs' direction='column' alignItems='flexStart'>
      <EuiFlexItem grow={false}>
        <EuiText size="s">{model}</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText size="xs" color='subdued'>{model_config}</EuiText>
      </EuiFlexItem>
    </EuiFlexGroup >
  )
}

const columns: Array<EuiBasicTableColumn<InferenceType>> = [
  {
    name: "Name",
    field: "inference_id",
    render: (inference_id: string) => (
      <EuiText size="s">{inference_id}</EuiText>
    )
  },
  {
    name: "Model",
    field: "model",
    render: (model: string, value: any) => {
      return (<ModelRender model={model} model_config={value.model_config} />)
    }
  },
  {
    name: "Provider",
    field: "provider",
    width: '160px',
    render: (provider: string) => (
      <EuiBadge color='hollow'>{provider}</EuiBadge>
    )
  },
  {
    name: "Requests",
    field: "request_total",
    width: '120px',
    align: 'right',
  },
  {
    name: "Success rate",
    field: "request_total",
    width: '120px',
    align: 'left',
    render: (request_total: number, value: any) => {
      const successRate = Math.ceil((1 - (value.request_errors / request_total)) * 100);

      return (
        <EuiText size="s" color={successRate > 95 ? 'success' : 'subdued'}>{successRate}%</EuiText>
      )
    }
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
    const cssStyles = css(paddingStyles['m']);

    return (
      <div css={cssStyles}><EuiText size="s"><p>{`Showing 1-${items.length} of ${items.length}`}</p></EuiText></div>
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
