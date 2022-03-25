import { EyeInvisibleOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table'
import { useRequest } from 'ahooks'
import { Button, message, Space, Tooltip } from 'antd'
import type React from 'react';
import { useRef } from 'react'
import { Link, useModel, useParams } from 'umi'
import type {
	Problem,
	ProblemList,
	ProblemSetAddProblem
} from 'utils/service';
import Horse, {
	ErrorCode
} from 'utils/service'

interface IProps {
	fetchingProblems: boolean
	fetchProblems: (parameters: ProTablePagination) => Promise<ProblemList>
	problemIdList: string[]
	onAddSuccess: () => void
}

const Index: React.FC<IProps> = ({
	fetchingProblems,
	fetchProblems,
	onAddSuccess,
	problemIdList
}) => {
	const { domain } = useModel('domain')
	const { domainUrl, problemSetId } =
		useParams<{ domainUrl: string; problemSetId: string }>()
	const ref = useRef<ActionType>()

	const { run: addProblem, loading: adding } = useRequest(
		async (values: ProblemSetAddProblem) => {
			const res = await Horse.problemSet.v1AddProblemInProblemSet(
				domainUrl,
				problemSetId,
				values
			)
			return res.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode === ErrorCode.Success) {
					message.success('add problem success')
					onAddSuccess()
				} else {
					message.error('add problem failed')
				}
			},
			onError: () => {
				message.error('add problem failed')
			}
		}
	)

	const columns: ProColumns<Problem>[] = [
		{
			title: '标题',
			width: 300,
			dataIndex: 'title',
			render: (_, record) => (
				<Space>
					<Link
						to={`/domain/${domain?.url ?? record.domainId}/problem/${
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
					disabled={problemIdList.includes(record.id)}
					key='add'
					onClick={async () =>
						addProblem({
							problem: record.id
						})
					}
				>
					添加
				</Button>
			]
		}
	]

	return (
		<ProTable<Problem>
			scroll={{ x: 'max-content' }}
			loading={fetchingProblems || adding}
			actionRef={ref}
			cardProps={false}
			columns={columns}
			request={async (parameters, _sorter, _filter) => {
				const data = await fetchProblems(parameters)
				return {
					data: data.results,
					total: data.count,
					success: true
				};
			}}
			rowKey='id'
			pagination={{
				showQuickJumper: true
			}}
			search={false}
			options={false}
		/>
	)
}

export default Index
