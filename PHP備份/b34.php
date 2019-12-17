
<form action="b35.php" method="get">
    Account:<input name='account'>
    <select name='area'>
        <option value='403'>北屯區</option>
        <option value='402'>南屯區</option>
        <option value='401'>西屯區</option>
        <option value='404'>東區</option>
    </select>
    <br>
    <input type="radio" name='gender' value='Female' checked>Female
    <input type="radio" name='gender' value='Male'>Male
    <br>
    <input type="checkbox" name='habit[]' value='1'>5 
    <input type="checkbox" name='habit[]' value='2'>6 
    <input type="checkbox" name='habit[]' value='3'>7 
    <input type="checkbox" name='habit[]' value='4'>8 
    <br>
    <br>
    <textarea name="memo">hello,world</textarea>
    <br>
    <br>
    <input type="range" name='range' >range
    <br>
    <br>
    <input type="file" name='ul' >
    <br>
    <br>
    <input type="hidden" name='key' value='key'>
    <br>
    <br>
    <input type="submit" value='Register'>
</form>     <!-- 檔案上傳一定要用post -->