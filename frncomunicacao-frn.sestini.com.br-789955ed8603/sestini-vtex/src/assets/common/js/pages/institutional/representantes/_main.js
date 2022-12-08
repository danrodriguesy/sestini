const Methods = {
    init() {
        Sestini.vtexMasterdata
            .search({}, [
                    "cargo",
                    "e-mail",
                    "estado",
                    "matricula",
                    "responsavel",
                    "telefone",
                    "zona"
                ],
                "RP"
            )
            .done(resp => {
                if (resp && resp.result && resp.result.dataStatus === 200) {
                    let result = resp.result.dataResponse;

                    rivets.bind($(".x-institutional__items"), {
                        items: result
                    });
                }
            });
    },
};

export default Methods;