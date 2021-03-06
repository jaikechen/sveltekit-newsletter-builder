import * as cheerio from 'cheerio'
import * as api from '../../lib/shared/http'
import type {Post} from '../../lib/shared/types/post.type'


export async function post({request}:any){
    const json = await request.json()
    const url = json.url as string
    const res = await api.get(url,'')
    const $ = cheerio.load(res)
    const desc =
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") || '';
    const image =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[property="og:image:url"]').attr("content")||
        $('meta[property="og:image:url"]').attr("content") ||'';
    const item ={desc, image, url }
    return {
        body: item
    }
}
