import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// NOTE: the actual service is hosted on https://ghloc.bytes.pw but uBlock
// Origin has a rule to block all third-party requests to *.pw so we use this
// API endpoint as a proxy to ghloc.bytes.pw
const GHLOC_BASE_URL = "https://ghloc.bytes.pw";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).end("Method Not Allowed");
	}

	const { owner, repo, branch, ...params } = req.query as Record<
		string,
		string
	>;

	if (!owner || !repo) {
		return res.status(400).end("Bad Request");
	}

	let url = `${GHLOC_BASE_URL}/${owner}/${repo}`;
	if (branch) {
		url += `/${branch}`;
	}

	try {
		const response = await axios.get(url, { params });
		const locs = response.data;
		res.setHeader("cache-control", "public, max-age=60, s-maxage=60");
		res.json(locs);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const errorMessage = e.response?.data.error as string | undefined;
			res.status(Number(e.code) || 400).end(errorMessage ?? e.message);
		} else {
			res.status(500).end("Internal Server Error");
		}
	}
}
