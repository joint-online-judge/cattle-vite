/**
 * This script is used to generate the API client for this project from openapi.json.
 * Also, we need to add a line of comment to disable errors generated by ts-check.
 */
const { generateApi } = require('swagger-typescript-api')
const path = require('path')
const fs = require('fs')
const { EOL } = require('os')

const envOpts = {
	submodule: 'submodule',
	localServer: 'localServer',
	stagingServer: 'stagingServer'
}

const urlMapping = {
	[envOpts.localServer]: 'http://localhost:34765/api/v1/openapi.json',
	[envOpts.stagingServer]: 'http://nichujie.xyz/api/v1/openapi.json'
}

const outputPath = path.resolve(process.cwd(), 'src/client')
const env = process.argv[2] ?? envOpts.submodule

if (
	env !== envOpts.submodule &&
	env !== envOpts.localServer &&
	env !== envOpts.stagingServer
) {
	console.error(
		'ERROR: wrong environment option. Valid options: submodule, localServer, stagingServer'
	)
	process.exit(-1)
}

console.log('Start to generate API client for ' + env)
generateApi({
	name: 'index.ts',
	output: outputPath,
	url: urlMapping[env],
	input:
		env === envOpts.submodule
			? path.resolve(process.cwd(), 'openapi/openapi.json')
			: undefined,
	httpClientType: 'axios',
	moduleNameFirstTag: true
})
	.then(({ files }) => {
		files.forEach(({ name }) => {
			const generatedFilePath = path.resolve(outputPath, name)
			const data = fs.readFileSync(generatedFilePath)
			fs.writeFile(
				generatedFilePath,
				'// @ts-nocheck generated file' + EOL + data,
				err => {
					if (err) throw err
				}
			)
		})
	})
	.catch(e => console.error(e))