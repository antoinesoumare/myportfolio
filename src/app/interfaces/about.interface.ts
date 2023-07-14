export interface About {
    data: {
        attributes:{
            AboutText: string,
            Headshot: {
                data: {
                    attributes: {
                        formats: {
                            medium: {
                                url: string
                            }
                        }
                    }
                }
            }
        }
    }
}