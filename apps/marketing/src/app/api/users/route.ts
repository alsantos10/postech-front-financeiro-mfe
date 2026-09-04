import { fetchUsers } from "@/infra/api/JsonUserService";
import { NextRequest, NextResponse } from "next/server";
import { OrderType } from "@/core/entities/DataGrid";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl
        
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const sort = searchParams.get("sort") || "name";
        const order = (searchParams.get("order") || OrderType.ASC) as OrderType;
        const term = searchParams.get("term") || undefined;

        if (page < 1 || limit < 1) {
            return NextResponse.json({message: "Página ou limite devem ser maiores que ZERO"}, {status: 400});
        }

        const response = await fetchUsers({page, limit, sort, order, term});
        if (!response) {
            return NextResponse.json({message: "Erro ao buscar dados dos usuários"}, {status: 400});
        }
        
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({message: "Erro ao listar usuários"}, {status: 500});
    }
}