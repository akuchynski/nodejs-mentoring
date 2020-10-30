const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest = () => {
    const req = {};
    req.params = jest.fn().mockReturnValue(req);
    return req;
};

const mockNext = () => {
    return jest.fn();
};

export { mockResponse, mockRequest, mockNext };
