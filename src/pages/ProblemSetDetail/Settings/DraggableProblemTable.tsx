import { EyeInvisibleOutlined, MenuOutlined } from '@ant-design/icons'
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table'
import { arrayMoveImmutable } from '@ant-design/pro-utils'
import { useRequest } from 'ahooks'
import { Button, message, Space, Tooltip } from 'antd'
import type React from 'react';
import { useEffect, useState } from 'react'
import {
	SortableContainer,
	SortableElement,
	SortableHandle
} from 'react-sortable-hoc'
import { Link, useModel, useParams } from 'umi'
import type {
	ProblemPreviewWithLatestRecord,
	ProblemSetUpdateProblem
} from 'utils/service';
import Horse, {
	ErrorCode
} from 'utils/service'
import './style.less'

interface IProps {
	problems: ProblemPreviewWithLatestRecord[]
	loading: boolean
	onUpdateFinish: () => void
	onDeleteSuccess: () => void
}

// eslint-disable-next-line new-cap
const DragHandle = SortableHandle(() => (
	<MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
))

const Index: React.FC<IProps> = ({
	problems,
	loading,
	onUpdateFinish,
	onDeleteSuccess
}) => {
	const { domain } = useModel('domain')
	const { domainUrl, problemSetId } =
		useParams<{ domainUrl: string; problemSetId: string }>()
	const [dataSource, setDataSource] =
		useState<ProblemPreviewWithLatestRecord[]>(problems)

	const { run: removeProblem, loading: removing } = useRequest(
		async (problemId: string) => {
			const res = await Horse.problemSet.v1DeleteProblemInProblemSet(
				domainUrl,
				problemSetId,
				problemId
			)
			return res.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode === ErrorCode.Success) {
					message.success('delete problem success')
					onDeleteSuccess()
				} else {
					message.error('delete problem failed')
				}
			},
			onError: () => {
				message.error('delete problem failed')
			}
		}
	)

	const { run: updateProblem, loading: updating } = useRequest(
		async (problemId: string, values: ProblemSetUpdateProblem) => {
			const res = await Horse.problemSet.v1UpdateProblemInProblemSet(
				domainUrl,
				problemSetId,
				problemId,
				values
			)
			return res.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode === ErrorCode.Success) {
					message.success('update problem success')
				} else {
					message.error('update problem failed')
				}

				onUpdateFinish() // If update error, still need to sync with remote data
			},
			onError: () => {
				message.error('update problem failed')
				onUpdateFinish() // If update error, still need to sync with remote data
			}
		}
	)

	const columns: ProColumns<ProblemPreviewWithLatestRecord>[] = [
		{
			title: '排序',
			dataIndex: 'sort',
			width: 60,
			className: 'drag-visible',
			render: () => <DragHandle />
		},
		{
			title: 'Title',
			key: 'title',
			dataIndex: 'title',
			render: (_, record) => (
				<Space>
					<Link
						to={`/domain/${domain?.url ?? ''}/problem/${
							record.url ?? record.id
						}`}
					>
						{record.title}
					</Link>
					{record.hidden ? (
						<Tooltip title='This problem is invisible to normal users.'>
							<EyeInvisibleOutlined />
						</Tooltip>
					) : null}
				</Space>
			)
		},
		{
			title: 'Option',
			key: 'option',
			width: 80,
			valueType: 'option',
			render: (_, record) => [
				<Button
					type='link'
					key='remove'
					onClick={async () => removeProblem(record.id)}
				>
					移除
				</Button>
			]
		}
	]

	// eslint-disable-next-line new-cap
	const SortableItem = SortableElement((props: any) => <tr {...props} />)
	// eslint-disable-next-line new-cap
	const SortContainer = SortableContainer((props: any) => <tbody {...props} />)

	const onSortEnd = ({
		oldIndex,
		newIndex
	}: {
		oldIndex: number
		newIndex: number
	}) => {
		if (oldIndex !== newIndex) {
			const newData = arrayMoveImmutable(
				[...dataSource],
				oldIndex,
				newIndex
			).filter(element => Boolean(element))
			setDataSource([...newData])
			if (dataSource[oldIndex]?.id) {
				updateProblem(dataSource[oldIndex].id, { position: newIndex })
			}
		}
	}

	const DraggableContainer = (props: any) => (
		<SortContainer
			useDragHandle
			disableAutoscroll
			helperClass='row-dragging'
			onSortEnd={onSortEnd}
			{...props}
		/>
	)

	const DraggableBodyRow = (props: any) => {
		const index = dataSource.findIndex(x => x.id === props['data-row-key'])
		return <SortableItem index={index} {...props} />
	}

	useEffect(() => {
		setDataSource(problems)
	}, [problems])

	return (
		<ProTable<ProblemPreviewWithLatestRecord>
			columns={columns}
			dataSource={dataSource}
			rowKey='id'
			pagination={false}
			toolBarRender={false}
			search={false}
			loading={loading || removing || updating}
			components={{
				body: {
					wrapper: DraggableContainer,
					row: DraggableBodyRow
				}
			}}
		/>
	)
}

export default Index